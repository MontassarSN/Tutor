"use server" ;
import { ServerClient } from "@/lib/supabasessr"; // Adjust the import path as needed


export async function fetchLabelColors ()  {
  const supabase = await ServerClient();
  const { data, error } = await supabase.from("labelcolors").select("*");

  if (error) {
    throw new Error(`Error fetching label colors: ${error.message}`);
  }

  return data;
};
