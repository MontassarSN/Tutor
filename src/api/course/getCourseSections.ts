"use server";
import { ServerClient } from "@/lib/supabasessr";
export async function fetchSectionsByCourseId(courseId: number) {
  const supabase = await ServerClient();
  const { data: sections, error } = await supabase
    .from("sections")
    .select(
      `
      *,
      lectures (
        id,
        title,
        description,
        notes,
        order,
        video_url
      )
    `
    )
    .eq("course_id", courseId)
    .order("order", { ascending: true });
  if (error) {
    throw new Error(error.message);
  }
  return sections.map((e) => {
    return {
      ...e,
      lectures: e.lectures.sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
    };
  });
}
