"use server";
import { ServerClient } from "@/lib/supabasessr";
import { Tables, TablesInsert } from "@/types/database.types";

export async function InsertSection(
  sections: TablesInsert<"sections">[]
): Promise<void> {
  const supabase = await ServerClient();

  const { error: insertError } = await supabase
    .from("sections")
    .insert(sections);

  if (insertError) {
    throw new Error(insertError.message);
  }
}
