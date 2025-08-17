import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: Request) {
  const cookieHeader = req.headers.get("cookie") || "";
  const matchUser = cookieHeader.match(/user_id=([^;]+)/);

  if (!matchUser) {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  const userId = matchUser[1];

  // update the current subscription to 'cancelled'
  const { error } = await supabaseAdmin
    .from("subscriptions")
    .update({ status: "cancelled" })
    .eq("user_id", userId);

  if (error) {
    console.error(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
