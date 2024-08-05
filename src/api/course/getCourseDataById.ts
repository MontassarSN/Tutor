"use server";
import { ServerClient } from "@/lib/supabasessr"; // Adjust the path as necessary
import { Tables } from "@/types/database.types"; // Adjust the path as necessary

export async function getCourseDataById(courseId: number) {
  const supabase = await ServerClient();

  const { data: course, error } = await supabase
    .from("courses")
    .select("*")
    .eq("id", courseId)
    .single(); // Use single() to get a single record

  if (error) {
    console.error("Error fetching course data:", error.message);
    return null; // Return null if there's an error
  }

  return course as Tables<"courses">; // Cast the result to the correct type
}
