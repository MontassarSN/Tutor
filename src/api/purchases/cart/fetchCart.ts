"use server";

import fetchActiveUser from "@/api/users/fetchUser";
import { ServerClient } from "@/lib/supabasessr"; // Adjust the import path as needed

export default async function fetchCart() {
  const supabase = await ServerClient();
  const user = await fetchActiveUser();
  if (!user) {
    throw new Error("User not authenticated");
  }
  const { data, error } = await supabase
    .from("cart")
    .select(
      `*,
        courses(*)`
    )
    .eq("user_id", user?.user_id);

    if (error) {
      throw new Error(error.message);
    }
    return data;

}


