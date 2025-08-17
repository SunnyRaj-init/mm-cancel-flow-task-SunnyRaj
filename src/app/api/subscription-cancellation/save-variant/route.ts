import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";


export async function GET(req: Request) {
  const cookieHeader = req.headers.get("cookie") || "";
  const match = cookieHeader.match(/user_id=([^;]+)/);
  if (!match) return NextResponse.json({ existingVariant: null });

  const { data } = await supabaseAdmin
    .from("cancellations")
    .select("downsell_variant")
    .eq("user_id", match[1])
    .maybeSingle();

  return NextResponse.json({ existingVariant: data?.downsell_variant ?? null });
}

export async function POST(req: Request) {
  const cookieHeader = req.headers.get("cookie") || "";
  const match = cookieHeader.match(/user_id=([^;]+)/);
  if (!match) {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  const userId = match[1];
  const { variant } = await req.json();

  // First, get the user's current subscription_id
  const { data: sub, error: fetchError } = await supabaseAdmin
    .from("subscriptions")
    .select("id")
    .eq("user_id", userId)
    .limit(1)
    .single();

  if (fetchError || !sub) {
    return NextResponse.json({ success: false }, { status: 500 });
  }

  // Upsert into "cancellations" table
  const { error } = await supabaseAdmin
    .from("cancellations")
    .upsert(
      {
        user_id: userId,
        subscription_id: sub.id,
        downsell_variant: variant
      },
      { onConflict: "user_id" }
    );

  if (error) {
    console.error(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
