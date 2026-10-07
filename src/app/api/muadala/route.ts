import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { MuadalaProgressSchema } from "@/lib/validations";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const curriculum = searchParams.get("curriculum") || "british";
    const userId = searchParams.get("userId");

    let query = supabase
      .from("muadala_progress")
      .select("*")
      .eq("curriculum", curriculum);

    if (userId) {
      query = query.eq("user_id", userId);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      curriculum,
      progress: data || [],
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to fetch progress" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parseResult = MuadalaProgressSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parseResult.error.format() },
        { status: 400 }
      );
    }

    const { userId, curriculum, stepNumber, isCompleted, notes } = parseResult.data;

    const { data, error } = await supabase
      .from("muadala_progress")
      .upsert(
        {
          user_id: userId || null,
          curriculum,
          step_number: stepNumber,
          is_completed: isCompleted,
          completed_at: isCompleted ? new Date().toISOString() : null,
          notes: notes || null,
        },
        { onConflict: "user_id,curriculum,step_number" }
      )
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      progress: data,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to save progress" }, { status: 500 });
  }
}
