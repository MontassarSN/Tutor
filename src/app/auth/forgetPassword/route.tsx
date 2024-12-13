"use server";
import { ServerClient } from "@/lib/supabasessr";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  try {
    if (!code) {
      throw new Error("code is not defined");
    }
    const supabase = await ServerClient();
    await supabase.auth.exchangeCodeForSession(code);
    return NextResponse.redirect(
      `${requestUrl.protocol}//${requestUrl.host}/change_password`,
    );
  } catch (error) {
    return NextResponse.redirect(`${requestUrl.origin}`);
  }
}