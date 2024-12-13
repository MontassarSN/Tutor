"use server";

import { ServerClient } from "@/lib/supabasessr";
import fetchActiveUser from "../users/fetchUser";

export default async function fetchPurchases() {
  const supabase = await ServerClient();
  const { data, error } = await supabase
    .from("purchases")
    .select("*")
  if (error) throw error;
  return data;
}
