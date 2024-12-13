"use server";

import { ServerClient } from "@/lib/supabasessr";
import fetchActiveUser from "../users/fetchUser";

export default async function fetchPurchaseInstructor() {
  const supabase = await ServerClient();
  const user = await fetchActiveUser();
  if (!user) {
    throw new Error("User not found");
  }
  const { data, error } = await supabase
    .from("purchases")
    .select("*")
    .eq("instructor_id", user?.user_id);
  if (error) throw error;
  return data;
}
