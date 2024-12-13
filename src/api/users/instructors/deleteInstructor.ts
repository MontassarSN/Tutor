"use server";

import { ServerClient } from "@/lib/supabasessr";

export default async function deleteInstructor(instructorId: string): Promise<any> {
  const supabase = await ServerClient();

  const { data, error } = await supabase
    .from("instructors")
    .delete()
    .eq("user_id", instructorId);

  if (error) {
    console.log("🚀 ~ deleteInstructor ~ error:", error.message)
    throw new Error(`Failed to delete instructor: ${error.message}`);
  }

  return data;
}
