import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: Request) {
  const cookieHeader = req.headers.get("cookie") || "";
  const match = cookieHeader.match(/job_feedback_step1=([^;]+)/);

  if (!match) {
    return NextResponse.json(
      { error: "Missing job feedback" },
      { status: 400 }
    );
  }

  const jobFeedback = JSON.parse(decodeURIComponent(match[1]));
  const userIdMatch = cookieHeader.match(/user_id=([^;]+)/);

  if (!userIdMatch) {
    return NextResponse.json({ error: "Missing user id" }, { status: 400 });
  }

  const userId = userIdMatch[1];

  // 1) Insert feedback
  const { error: upsertError } = await supabaseAdmin
    .from("cancellation_job_feedback")
    .upsert(
      {
        user_id: userId,
        found_with_mm: jobFeedback.foundWithMM,
        roles_applied: jobFeedback.rolesApplied,
        companies_emailed: jobFeedback.companiesEmailed,
        companies_interviewed: jobFeedback.companiesInterviewed,
      },
      { onConflict: "user_id" }
    );

  if (upsertError) {
    console.error(upsertError);
    return NextResponse.json(
      { success: false, error: "upsert_failed" },
      { status: 500 }
    );
  }
  // 2) Update subscription status → pending_cancellation
  const { error: updateError } = await supabaseAdmin
    .from("subscriptions")
    .update({ status: "pending_cancellation" })
    .eq("user_id", userId);

  if (updateError) {
    console.error(updateError);
    return NextResponse.json(
      { error: "Failed to update subscription" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
