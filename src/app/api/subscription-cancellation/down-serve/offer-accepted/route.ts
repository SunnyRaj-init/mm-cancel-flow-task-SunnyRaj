// /app/api/subscription-cancellation/down-serve/offer-accepted/route.ts
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: Request) {
  const cookieHeader = req.headers.get("cookie") || "";
  const match = cookieHeader.match(/user_id=([^;]+)/);

  if (!match) {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  const userId = match[1];

  // 1. Get the user’s current subscription
  const { data: subscription, error: subError } = await supabaseAdmin
    .from("subscriptions")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (subError || !subscription) {
    return NextResponse.json({ success: false }, { status: 500 });
  }

  // 2. Check if the discount has already been accepted
  const { data: cancellation } = await supabaseAdmin
    .from("cancellations")
    .select("accepted_downsell")
    .eq("user_id", userId)
    .maybeSingle();

  if (cancellation?.accepted_downsell) {
    return NextResponse.json({ success: true, alreadyApplied: true });
  }

  // 3. Apply the $10 discount and reset status to "active"
  const newPrice = Math.max(subscription.monthly_price - 1000, 0);
  const { error: updateError } = await supabaseAdmin
    .from("subscriptions")
    .update({
      monthly_price: newPrice,
      status: "active"
    })
    .eq("id", subscription.id);

  if (updateError) {
    return NextResponse.json({ success: false }, { status: 500 });
  }

  // 4. Mark the discount as accepted
  await supabaseAdmin
    .from("cancellations")
    .update({ accepted_downsell: true })
    .eq("user_id", userId);

  return NextResponse.json({ success: true, alreadyApplied: false });
}
