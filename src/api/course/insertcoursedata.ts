"use server";
import { ServerClient } from "@/lib/supabasessr";
import { Tables, TablesInsert } from "@/types/database.types";

export async function InsertCourseData(
  args: TablesInsert<"courses">
): Promise<string> {
  const supabase = await ServerClient();
  const { data: course, error: insertError } = await supabase
    .from("courses")
    .insert([{ ...args }])
    .select("id")
    .single();

  if (insertError) {
    throw new Error(insertError.message);
  }

  if (course && course.id) {
    return course.id;
  } else {
    throw new Error("Insertion failed, no course ID returned");
  }
}
