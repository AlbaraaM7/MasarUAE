import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { ActivitySchema } from "@/lib/validations";

// GET /api/activities - Retrieve all activities and calculate total volunteer hours
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    let query = supabase
      .from("student_activities")
      .select("*")
      .order("created_at", { ascending: false });

    if (userId) {
      query = query.eq("user_id", userId);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const activities = data || [];
    const totalVolunteerHours = activities
      .filter((a) => a.category === "volunteering")
      .reduce((sum, a) => sum + (Number(a.hours) || 0), 0);

    return NextResponse.json({
      success: true,
      totalVolunteerHours,
      count: activities.length,
      activities,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to fetch activities" }, { status: 500 });
  }
}

// POST /api/activities - Create a new activity entry
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parseResult = ActivitySchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parseResult.error.format() },
        { status: 400 }
      );
    }

    const { userId, category, organization, role, hours, description, verified, dateCompleted } =
      parseResult.data;

    const { data, error } = await supabase
      .from("student_activities")
      .insert({
        user_id: userId || null,
        category,
        organization,
        role,
        hours,
        description,
        verified,
        date_completed: dateCompleted || new Date().toISOString().split("T")[0],
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      activity: data,
    }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to save activity" }, { status: 500 });
  }
}
