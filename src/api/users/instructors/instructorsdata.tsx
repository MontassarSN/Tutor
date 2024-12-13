"use server";
import { ServerClient } from "@/lib/supabasessr";

export async function fetchInstructors() {
  const supabase = await ServerClient();

  const { data, error } = await supabase
    .from("instructors")
    .select(
      `
      *,
      users (*)
    `
    )
    .eq("approved", true);

  if (error) {
    return { error, data: null };
  }

  return { data, error: null };
}
