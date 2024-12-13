"use server";
import { ServerClient } from "@/lib/supabasessr";
export async function fetchSectionsByCourseId(courseId: string) {
  const supabase = await ServerClient();
  const { data: sections, error } = await supabase
    .from("sections")
    .select(
      `*`
    )
    .eq("course_id", courseId)
    .order("order", { ascending: true });
  if (error) {
    throw new Error(error.message);
  }
  return sections;
}
