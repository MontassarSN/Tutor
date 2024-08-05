"use server";

import { ServerClient } from "@/lib/supabasessr";

export async function fetchTop10Courses() {
  const supabase = await ServerClient();

  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .order("students", { ascending: false })
    .limit(10);

  if (error) {
    throw new Error(`Error fetching top 10 courses: ${error.message}`);
  }

  return data;
}
