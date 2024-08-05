"use server";
import { ServerClient } from "@/lib/supabasessr";

export async function SignOut() {
  const supabase = await ServerClient();
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}
