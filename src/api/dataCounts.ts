// src/api/fetchCounts.ts
"use server";
import { ServerClient } from "@/lib/supabasessr";

export async function fetchCounts() {
  const supabase = await ServerClient();

  // Count of users
  const { count: userCount, error: userCountError } = await supabase
    .from("users")
    .select('*', { count: 'exact', head: true });

  if (userCountError) {
    throw new Error(`Error fetching user count: ${userCountError.message}`);
  }

  // Count of instructors
  const { count: instructorCount, error: instructorCountError } = await supabase
    .from("instructors")
    .select('*', { count: 'exact', head: true });

  if (instructorCountError) {
    throw new Error(`Error fetching instructor count: ${instructorCountError.message}`);
  }

  // Count of courses
  const { count: courseCount, error: courseCountError } = await supabase
    .from("courses")
    .select('*', { count: 'exact', head: true });

  if (courseCountError) {
    throw new Error(`Error fetching course count: ${courseCountError.message}`);
  }

  return {
    userCount,
    instructorCount,
    courseCount,
  };
}
