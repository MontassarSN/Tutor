"use server";

import { uploadFiles } from "@/hooks/useFileUpload";
import { ServerClient } from "@/lib/supabasessr";
import { Tables, TablesUpdate } from "@/types/database.types";

export async function updateLecture(
  id: string,
  lectureData: TablesUpdate<"lectures">
): Promise<void> {
  const supabase = await ServerClient();
console.log(lectureData.video_url)

  const { error: transactionError } = await supabase
    .from("lectures")
    .update(lectureData)
    .eq("id", id);

  if (transactionError) {
    console.error("Error updating lecture:", transactionError);
    throw new Error(`Error updating lecture: ${transactionError.message}`);
  } else {
    console.log(`Lecture with ID ${id} updated successfully.`);
  }
}
