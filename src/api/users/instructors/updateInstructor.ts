"use server";
import { ServerClient } from "@/lib/supabasessr";
import { TablesUpdate } from "@/types/database.types";

export async function UpdateInstructor(args: TablesUpdate<"instructors">) {
  const supabase = await ServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session || !session.user) {
    throw new Error("No user session found");
  }
  const { error } = await supabase
    .from("instructors")
    .update({ ...args })
    .eq("user_id", session.user.id);
  if (error) {
    throw new Error(`Update error: ${error.message}`);
  }
}
