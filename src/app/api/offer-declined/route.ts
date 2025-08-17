import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    // extract user_id
    const cookieHeader = req.headers.get("cookie") || "";
    const userIdMatch = cookieHeader.match(/user_id=([^;]+)/);
    const variantMatch = cookieHeader.match(/downsell_variant=([^;]+)/);

    if (!userIdMatch || !variantMatch) {
      return NextResponse.json({ success: false }, { status: 400 });
    }

    const userId = userIdMatch[1];
    const downsellVariant = variantMatch[1]; // "A" or "B"

    const { rolesApplied, companiesEmailed, companiesInterviewed } =
      await req.json();

    // fetch subscription_id
    const { data: sub, error } = await supabaseAdmin
      .from("subscriptions")
      .select("id")
      .eq("user_id", userId)
      .single();

    if (error || !sub) {
      return NextResponse.json({ success: false }, { status: 500 });
    }

    // upsert cancellation
    const { error: upsertError } = await supabaseAdmin
      .from("cancellations")
      .upsert(
        {
          user_id: userId,
          subscription_id: sub.id,
          downsell_variant: downsellVariant,          
          roles_applied: rolesApplied,
          companies_emailed: companiesEmailed,
          companies_interviewed: companiesInterviewed,
        },
        { onConflict: "user_id" }
      );

    if (upsertError) {
      console.error(upsertError);
      return NextResponse.json({ success: false }, { status: 500 });
    }

    // set subscription status → pending_cancellation
    const { error: updateError } = await supabaseAdmin
      .from("subscriptions")
      .update({ status: "pending_cancellation" })
      .eq("id", sub.id);

    if (updateError) {
      console.error(updateError);
      return NextResponse.json({ success: false }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
