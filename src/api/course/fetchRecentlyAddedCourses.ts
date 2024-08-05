"use server";

import { ServerClient } from "@/lib/supabasessr";

export async function fetchRecentlyAddedCourses() {
  const supabase = await ServerClient();

  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(4);

  if (error) {
    throw new Error(`Error fetching Newest courses: ${error.message}`);
  }

  return data;
}
