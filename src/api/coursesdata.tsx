// src/app/coursesdata.tsx
"use server";
import { createClient } from "../lib/supabaseClient"; // Adjust path as needed

export const fetchCourses = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.from("courses").select("*");
  console.log("🚀 ~ fetchCourses ~ error:", error)
  console.log("🚀 ~ fetchCourses ~ data:", data)
  if (error) {
    return { error, data: null };
  }
  return { data, error: null };
};
