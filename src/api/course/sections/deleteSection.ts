"use server";
import { ServerClient } from "@/lib/supabasessr";

export async function deleteSection(sectionIds: string[]) {
  const supabase = await ServerClient();

  const { error } = await supabase
    .from("sections")
    .delete()
    .in("id", sectionIds);

  if (error) {
    throw new Error(`Error deleting section: ${error.message}`);
  }
}
