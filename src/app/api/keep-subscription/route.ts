// /app/api/keep-subscription/route.ts
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: Request) {
  const cookieHeader = req.headers.get("cookie") || "";
  const match = cookieHeader.match(/user_id=([^;]+)/);

  if (!match) {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  const userId = match[1];

  // Get the user’s subscription
  const { data: subscription, error: subError } = await supabaseAdmin
    .from("subscriptions")
    .select("id")
    .eq("user_id", userId)
    .single();

  if (subError || !subscription) {
    return NextResponse.json({ success: false }, { status: 500 });
  }

  // Update only the status to "active"
  const { error: updateError } = await supabaseAdmin
    .from("subscriptions")
    .update({ status: "active" })
    .eq("id", subscription.id);

  if (updateError) {
    return NextResponse.json({ success: false }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
