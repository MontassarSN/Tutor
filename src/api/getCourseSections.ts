"use server";
import { ServerClient } from "@/lib/supabasessr";
import { Tables } from "@/types/database.types";

export async function fetchSectionsByCourseId(courseId: number) {
  const supabase = await ServerClient();
  

  const { data, error } = await supabase
    .from('sections')
    .select(`
      *,
      lectures (
        id,
        title,
        description,
        notes,
        order,
        video_url
      )
    `)
    .eq('course_id', courseId)
    .order('order', { ascending: true })
    .order('lectures.order', { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  // Ensure each section has an array of lectures
  const sections = data as (Tables<"sections"> & { lectures: Tables<"lectures">[] })[];

  // Transform the data to ensure each section includes ordered lectures
  const sectionsWithLectures = sections.map(section => ({
    ...section,
    lectures: section.lectures.sort((a, b) => (a.order ?? 0) - (b.order ?? 0)) // Ensure lectures are ordered
  }));

  return sectionsWithLectures;
}
