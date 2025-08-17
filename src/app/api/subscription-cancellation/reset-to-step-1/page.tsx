import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: Request) {
  const cookieHeader = req.headers.get("cookie") || "";
  const matchUser = cookieHeader.match(/user_id=([^;]+)/);

  if (!matchUser) {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  const userId = matchUser[1];

  // 1) Delete feedback row (if it exists)
  const { error: deleteError } = await supabaseAdmin
    .from("cancellation_job_feedback")
    .delete()
    .eq("user_id", userId);

  if (deleteError) {
    console.error(deleteError);
    return NextResponse.json({ success: false }, { status: 500 });
  }

  // 2) Reset subscription status back to "active"
  const { error: updateError } = await supabaseAdmin
    .from("subscriptions")
    .update({ status: "active" })
    .eq("user_id", userId);

  if (updateError) {
    console.error(updateError);
    return NextResponse.json({ success: false }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
