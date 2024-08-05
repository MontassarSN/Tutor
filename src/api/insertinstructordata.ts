"use server";
import { ServerClient } from "@/lib/supabasessr"; // Adjust the import path as needed
import { TablesInsert } from "@/types/database.types";

export async function InsertInstructorData(
  args: Omit<TablesInsert<"instructors">, "user_id">
): Promise<void> {
  const supabase = await ServerClient();
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  const { error: insertError } = await supabase
    .from("instructors")
    .insert([{ ...args, user_id: String(session?.user.id) }]);

  if (insertError) throw new Error(insertError.message);
}
