"use server";
import { ServerClient } from "@/lib/supabasessr";

export async function deleteCourseData(courseId: number): Promise<void> {
  const supabase = await ServerClient();

  // Delete lectures
  const { error: deleteLecturesError } = await supabase
    .from('lectures')
    .delete()
    .eq('course_id', courseId);

  if (deleteLecturesError) {
    throw new Error(`Error deleting lectures: ${deleteLecturesError.message}`);
  }

  // Delete sections
  const { error: deleteSectionsError } = await supabase
    .from('sections')
    .delete()
    .eq('course_id', courseId);

  if (deleteSectionsError) {
    throw new Error(`Error deleting sections: ${deleteSectionsError.message}`);
  }
}
