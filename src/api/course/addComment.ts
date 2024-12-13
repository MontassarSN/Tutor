"use server";

import { ServerClient } from "@/lib/supabasessr";
import { TablesInsert } from "@/types/database.types";

export default async function addOrUpdateComment(
  content: string,
  courseId: string,
  rating: number
) {
  const supabase = await ServerClient();

  // Get the current session to retrieve the user ID
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError || !session) {
    throw new Error("User session not found.");
  }

  const userId = session.user.id;
  const { data: existingComment, error: fetchError } = await supabase
    .from("comments")
    .select("*")
    .eq("user_id", userId)
    .eq("course_id", courseId)
    .single();
if (existingComment) {
    const { data, error } = await supabase
      .from("comments")
      .update({ rating, content })
      .eq("user_id", userId)
      .eq("course_id", courseId);

    if (error) {
      throw new Error(`Failed to update comment: ${error.message}`);
    }
  } else {
    const { data, error } = await supabase.from("comments").insert([
      { rating, content, course_id: courseId },
    ]);

    if (error) {
      console.error(error.message);

      throw new Error(`Failed to add comment: ${error.message}`);
    }
  }
}
