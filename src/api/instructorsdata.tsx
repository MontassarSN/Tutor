"use server";
import { ServerClient } from "@/lib/supabasessr"; // Adjust the import path as needed


export async function fetchInstructors () {
  const supabase = await ServerClient();
  const { data, error } = await supabase.from("instructors").select("*");
  if (error) {
    return { error, data: null };
  }
  return { data, error: null };
};
