"use server";

import { ServerClient } from "@/lib/supabasessr"; // Adjust the import path as needed


export default async function fetchActiveUser() {
  const supabase = await ServerClient();
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();
  if (session?.user && session.user.id) {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("user_id", session.user.id)
      .single();

    if (error) {
      throw new Error(error.message);
    }
    return data;
  }
  return null;
}
