import { NextResponse } from "next/server";
import { UAE_UNIVERSITIES } from "@/data/universities";
import { UniversityEligibilitySchema } from "@/lib/validations";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parseResult = UniversityEligibilitySchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Invalid eligibility request", details: parseResult.error.format() },
        { status: 400 }
      );
    }

    const { curriculum, grades, budgetAED, emiratePreference } = parseResult.data;

    const matches = UAE_UNIVERSITIES.map((uni) => {
      let matchTier: "Target" | "Reach" | "Safety" = "Target";
      let eligibilityScore = 75; // percentage confidence

      if (curriculum === "british") {
        const aLevels = (grades.aLevels || "BBB").toUpperCase();
        if (aLevels.includes("A*") || aLevels.startsWith("AAA") || aLevels.startsWith("AAB")) {
          if (["nyuad", "khalifa"].includes(uni.id)) matchTier = "Target";
          else matchTier = "Safety";
          eligibilityScore = 95;
        } else if (aLevels.startsWith("ABB") || aLevels.startsWith("BBB")) {
          if (["nyuad", "khalifa"].includes(uni.id)) matchTier = "Reach";
          else if (["aus", "birmingham", "uaeu"].includes(uni.id)) matchTier = "Target";
          else matchTier = "Safety";
          eligibilityScore = 80;
        } else if (aLevels.startsWith("BBC") || aLevels.startsWith("BCC") || aLevels.startsWith("CCC")) {
          if (["nyuad", "khalifa", "birmingham", "aus"].includes(uni.id)) matchTier = "Reach";
          else if (["heriot-watt", "uowd", "uos", "rit", "uaeu"].includes(uni.id)) matchTier = "Target";
          else matchTier = "Safety";
          eligibilityScore = 65;
        } else {
          if (["cud", "alain"].includes(uni.id)) matchTier = "Target";
          else matchTier = "Reach";
          eligibilityScore = 40;
        }
      } else if (curriculum === "ib") {
        const pts = grades.ibPoints || 32;
        if (pts >= 38) {
          matchTier = ["nyuad", "khalifa"].includes(uni.id) ? "Target" : "Safety";
          eligibilityScore = 90;
        } else if (pts >= 32) {
          if (["nyuad", "khalifa"].includes(uni.id)) matchTier = "Reach";
          else if (["aus", "birmingham", "uaeu"].includes(uni.id)) matchTier = "Target";
          else matchTier = "Safety";
          eligibilityScore = 80;
        } else if (pts >= 28) {
          if (["heriot-watt", "uowd", "uos", "rit"].includes(uni.id)) matchTier = "Target";
          else matchTier = "Reach";
          eligibilityScore = 65;
        } else {
          matchTier = ["cud", "alain"].includes(uni.id) ? "Target" : "Reach";
          eligibilityScore = 50;
        }
      } else if (curriculum === "cbse") {
        const pct = grades.cbsePercentage || 80;
        if (pct >= 90) {
          matchTier = ["nyuad", "khalifa"].includes(uni.id) ? "Target" : "Safety";
          eligibilityScore = 92;
        } else if (pct >= 80) {
          if (["aus", "birmingham", "uaeu"].includes(uni.id)) matchTier = "Target";
          else if (["nyuad", "khalifa"].includes(uni.id)) matchTier = "Reach";
          else matchTier = "Safety";
          eligibilityScore = 82;
        } else if (pct >= 70) {
          if (["heriot-watt", "uowd", "uos", "rit"].includes(uni.id)) matchTier = "Target";
          else matchTier = "Reach";
          eligibilityScore = 70;
        } else {
          matchTier = ["cud", "alain"].includes(uni.id) ? "Target" : "Reach";
          eligibilityScore = 45;
        }
      }

      // Check budget constraint
      const affordable = budgetAED ? uni.annualTuitionAED.min <= budgetAED : true;

      // Check emirate preference
      const matchesEmirate =
        !emiratePreference || emiratePreference === "All" || uni.emirate === emiratePreference;

      return {
        university: uni,
        matchTier,
        eligibilityScore,
        affordable,
        matchesEmirate,
        estimatedTuition: uni.annualTuitionAED,
        availableScholarships: uni.scholarships,
      };
    });

    const filtered = matches.filter((m) => m.matchesEmirate);

    return NextResponse.json({
      success: true,
      totalCount: filtered.length,
      safetyCount: filtered.filter((f) => f.matchTier === "Safety").length,
      targetCount: filtered.filter((f) => f.matchTier === "Target").length,
      reachCount: filtered.filter((f) => f.matchTier === "Reach").length,
      results: filtered,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to calculate eligibility" }, { status: 500 });
  }
}
