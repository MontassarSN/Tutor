"use server";
import { ServerClient } from "@/lib/supabasessr";
import { Tables, TablesInsert } from "@/types/database.types";

export async function InsertLecture(
  lecturesData: TablesInsert<"lectures">[]
): Promise<void> {
  const supabase = await ServerClient();
  const sanitizedData = lecturesData.map((data) => {
    const { created_at, ...rest } = data;
    return rest;
  });
  // Insert lecture data into the 'lectures' table
  const { error: insertError } = await supabase
    .from("lectures")
    .insert(sanitizedData);

  // Error handling
  if (insertError) {
    console.error("Insert Error:", insertError.message);
    throw new Error(insertError.message);
  }
}
