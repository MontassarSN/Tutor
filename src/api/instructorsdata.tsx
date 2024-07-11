"use server";
import { supabase } from "../lib/supabasessr"; // Adjust path as needed

export const fetchInstructors = async () => {
  const { data, error } = await supabase.from("instructors").select("*");
  if (error) {
    return { error, data: null };
  }
  return { data, error: null };
};
