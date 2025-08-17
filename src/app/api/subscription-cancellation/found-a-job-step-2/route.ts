import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: Request) {
  const cookieHeader = req.headers.get("cookie") || "";
  const matchFeedback = cookieHeader.match(/job_feedback_step1=([^;]+)/);
  const matchUser = cookieHeader.match(/user_id=([^;]+)/);

  if (!matchFeedback || !matchUser) {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  const jobFeedback = JSON.parse(decodeURIComponent(matchFeedback[1]));
  const userId = matchUser[1];

  // update the existing row (one per user) -> set "feedback"
  const { error } = await supabaseAdmin
    .from("cancellation_job_feedback")
    .update({ feedback: jobFeedback.feedback })
    .eq("user_id", userId);

  if (error) {
    console.error(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
