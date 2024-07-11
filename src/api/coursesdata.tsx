// src/app/coursesdata.tsx
"use server";
import { supabase } from "../lib/supabasessr"; // Adjust path as needed

export const fetchCourses = async () => {
  const { data, error } = await supabase.from("courses").select("*");
  console.log("🚀 ~ fetchCourses ~ error:", error);
  console.log("🚀 ~ fetchCourses ~ data:", data);
  if (error) {
    return { error, data: null };
  }
  return { data, error: null };
};
