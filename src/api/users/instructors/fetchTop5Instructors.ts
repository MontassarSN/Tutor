"use server";

import { ServerClient } from "@/lib/supabasessr";

export async function fetchTop5Instructors() {
  const supabase = await ServerClient();

  const { data, error } = await supabase
    .from("instructors")
    .select("*")
    .order("students", { ascending: false })
    .eq('approved', true)
    .limit(3);

  if (error) {
    throw new Error(`Error fetching top 10 courses: ${error.message}`);
  }

  return data;
}
