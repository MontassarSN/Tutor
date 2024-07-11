
"use server";
import { createClient } from "../lib/supabaseClient"; // Adjust path as needed

export const fetchInstructors = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.from("instructors").select("*");
  if (error) {
    return { error, data: null };
  }
  return { data, error: null };
};
