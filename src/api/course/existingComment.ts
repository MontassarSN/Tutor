"use server";

import { ServerClient } from "@/lib/supabasessr";
import { TablesInsert } from "@/types/database.types";

export default async function existingComment(
  courseId: string,
)  {
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
    return existingComment;
  }
  
  return false;

}