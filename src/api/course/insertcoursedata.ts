"use server";
import { ServerClient } from "@/lib/supabasessr";
import { Tables, TablesInsert } from "@/types/database.types";

export async function InsertCourseData(
  args: TablesInsert<"courses">
): Promise<Tables<"courses">> {
  const supabase = await ServerClient();
  const {
    data: { user },
    error: sessionError,
  } = await supabase.auth.getUser();

  if (sessionError) {
    throw new Error(sessionError.message);
  }

  const { data: course, error: insertError } = await supabase
    .from("courses")
    .insert([{ ...args, user_id: String(user?.id) }])
    .select()
    .single();

  if (insertError) {
    throw new Error(insertError.message);
  }
  if (course) {
    return course; // Return the id of the first inserted row
  } else {
    throw new Error("Insertion failed, no course ID returned");
  }
}
