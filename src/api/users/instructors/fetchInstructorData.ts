"use server";

import { ServerClient } from "@/lib/supabasessr";
import { Tables } from "@/types/database.types";

export default async function fetchInstructorData(id: string): Promise<Tables<"instructors">> {
  const supabase = await ServerClient(); 

  const { data, error } = await supabase
    .from("instructors")
    .select("*")
    .eq("user_id", id)
    .eq('approved', true)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as Tables<"instructors">;
}
