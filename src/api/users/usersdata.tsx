"use server";
import { ServerClient } from "@/lib/supabasessr"; // Adjust path as needed

export async function fetchUsers ()  {
  const supabase = await ServerClient();
  const { data, error } = await supabase.from("users").select("*");
  if (error) {
    throw new Error(error.message);
  }
  return data;
};
