"use server";
import { ServerClient } from "@/lib/supabasessr";

export async function SignIn(email: string, password: string) {
  const supabase = await ServerClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  console.log("🚀 ~ SignIn ~ data:", data);
  console.log("🚀 ~ SignIn ~ error:", error);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
