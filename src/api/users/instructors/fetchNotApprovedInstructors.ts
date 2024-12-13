"use server";

import { ServerClient } from "@/lib/supabasessr";

export async function fetchNotApprovedInstructors() {
  const supabase = await ServerClient();

  const { data, error } = await supabase
    .from("instructors")
    .select(
      `
        *,
        users (*)
      `
    )
    .eq("approved", false);

  if (error) {
    throw new Error(`Error fetching top 10 courses: ${error.message}`);
  }

  return data;
}
