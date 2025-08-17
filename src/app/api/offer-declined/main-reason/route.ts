import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    // extract user_id from cookie
    const cookieHeader = req.headers.get("cookie") || "";
    const match = cookieHeader.match(/user_id=([^;]+)/);
    if (!match) {
      return NextResponse.json({ success: false }, { status: 400 });
    }
    const userId = match[1];

    // parse body
    const payload = await req.json();

    // update ONLY reason and description in the previously-created cancellation row
    const { error: updateError } = await supabaseAdmin
      .from("cancellations")
      .update({
        reason: payload.reason,
        reason_description: payload.description, 
      })
      .eq("user_id", userId);

    if (updateError) {
      console.error(updateError);
      return NextResponse.json({ success: false }, { status: 500 });
    }

    // also change subscription to cancelled
    const { data: sub } = await supabaseAdmin
      .from("subscriptions")
      .select("id")
      .eq("user_id", userId)
      .single();

    if (sub) {
      await supabaseAdmin
        .from("subscriptions")
        .update({ status: "cancelled" })
        .eq("id", sub.id);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
