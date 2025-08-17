import { NextResponse } from "next/server";
import { supabaseAdmin, supabase } from "@/lib/supabase";

export async function GET(req: Request) {
  try {
    const cookies = req.headers.get("cookie") || "";
    // extract the cookie named user_id_enc
    const match = cookies.match(/user_id=([^;]+)/);
    if (!match) {
      return NextResponse.json({ error: "Missing user id" }, { status: 400 });
    }
    const {
      data: { session },
    } = await supabase.auth.getSession();
    console.log(session,"hehe")
    const userId = match[1];
    // Query subscriptions from Supabase

    const { data, error } = await supabaseAdmin
      .from("subscriptions")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error) throw error;
    console.log(data);
    return NextResponse.json({ subscription: data });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to decrypt or fetch data" },
      { status: 500 }
    );
  }
}
