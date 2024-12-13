"use server";
import { ServerClient } from "@/lib/supabasessr";
import { Tables } from "@/types/database.types";
export async function fetchLecturesByCourseId(
  courseId: string
): Promise<Tables<"lectures">[]> {
  const supabase = await ServerClient();
  const { data: lectures, error } = await supabase
    .from("lectures")
    .select(`*`)
    .eq("course_id", courseId);
  if (error) {
    throw new Error(error.message);
  }
  return lectures;
}
