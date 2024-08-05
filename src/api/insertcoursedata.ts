"use server";
import { ServerClient } from "@/lib/supabasessr";
import { TablesInsert } from "@/types/database.types";

export async function InsertCourseData(args: TablesInsert<"courses">): Promise<number> {
  const supabase = await ServerClient();
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError) {
    throw new Error(sessionError.message);
  }

  const { data: course, error: insertError } = await supabase
    .from("courses")
    .insert([{ ...args, user_id: String(session?.user.id) }])
    .select('id'); // Select the id field to ensure it's returned
  
  if (insertError) {
    throw new Error(insertError.message);
  }
  
  if (course && course.length > 0) {
    return course[0].id; // Return the id of the first inserted row
  }
  
  throw new Error("Insertion failed, no course ID returned");
}
