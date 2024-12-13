"use server";
import { ServerClient } from "@/lib/supabasessr";

export async function deleteLecture(lectureIds: string[]): Promise<void> {
  const supabase = await ServerClient();

  const { error } = await supabase
    .from("lectures")
    .delete()
    .in("id", lectureIds);

  if (error) {
    throw new Error(`Error deleting lecture: ${error.message}`);
  }
}
