"use server";
import { ServerClient } from "@/lib/supabasessr";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  try {
    if (!code) {
      const error = requestUrl.searchParams.get("error");
      const error_description =
        requestUrl.searchParams.get("error_description");
      console.error(error + " description :" + error_description);
      throw new Error("code is not defined");
    }
    const supabase = await ServerClient();
    await supabase.auth.exchangeCodeForSession(code);
    const redirectUrl = `${requestUrl.protocol}//${requestUrl.host}/SignIn`;
    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    return NextResponse.redirect(`${requestUrl.origin}`);
  }
}