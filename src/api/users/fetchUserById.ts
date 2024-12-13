"use server";

import { ServerClient } from "@/lib/supabasessr";
import { Tables } from "@/types/database.types";

export default async function fetchUserById(id: string): Promise<Tables<"users">> {
  const supabase = await ServerClient(); 

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("user_id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as Tables<"users">;
}
