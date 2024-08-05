// src/api/fetchCourses.ts
"use server";
import { ServerClient } from "@/lib/supabasessr"; // Adjust the import path as needed

export async function fetchCourses(page: number, pageSize: number) {
  const supabase = await ServerClient();
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .range(from, to);

  if (error) {
    throw new Error(`Error fetching courses: ${error.message}`);
  }

  return data;
}
