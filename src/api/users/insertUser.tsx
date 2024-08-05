"use server";
import { ServerClient } from "@/lib/supabasessr"; // Adjust the import path as needed
import { TablesInsert } from "@/types/database.types";

export async function InsertUser(args: TablesInsert<"users">) {
  const supabase = await ServerClient();
  const { data, error } = await supabase.from("users").insert([args]).select();

  if (error) throw new Error(error.message);

  return data;
}
