"use server";
import { ServerClient } from "@/lib/supabasessr";
import { TablesUpdate } from "@/types/database.types";

export async function updateSection(section: TablesUpdate<"sections">) {
  const supabase = await ServerClient();
  const { id, ...updatedData } = section; // Destructure to separate ID from other properties

  // Ensure that the id is defined and is a string
  if (!id || typeof id !== "string") {
    throw new Error("Invalid or missing section ID.");
  }

  const { error } = await supabase
    .from("sections") // Replace "sections" with your actual table name if needed
    .update(updatedData)
    .eq("id", id);

  if (error) {
    console.error("Failed to update section:", error.message);
    throw new Error(`Failed to update section: ${error.message}`);
  }

  return true;
}
