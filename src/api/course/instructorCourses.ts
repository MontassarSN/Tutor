"use server";

import { ServerClient } from "@/lib/supabasessr"; // Adjust the import path as needed

export async function FetchInstructorCourses(id: string) {
  const supabase = await ServerClient();

  // Fetch courses where the instructor ID is in the instructors_ids array
  const { data: coursesData, error: coursesError } = await supabase
    .from("courses")
    .select("*")
    .contains("instructor_ids", [id]); // Check if the ID is in the instructors_ids array

  if (coursesError) throw new Error(`Failed to fetch courses: ${coursesError.message}`);

  return coursesData;
}
