"use server";

import { ServerClient } from "@/lib/supabasessr"; // Adjust the import path as needed

export async function FetchInstructorCourses(user_id: string) {
  const supabase = await ServerClient();

  try {
    // Fetch courses owned by the instructor
    const { data: coursesData, error: coursesError } = await supabase
      .from("courses")
      .select("*")
      .match({ user_id });

    if (coursesError) throw coursesError;

    return coursesData;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
