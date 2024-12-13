"use server";

import { ServerClient } from "@/lib/supabasessr";
import { Tables, TablesInsert } from "@/types/database.types";

export default async function addToCart(args: TablesInsert<"cart">) {
  const supabase = await ServerClient();

  const { error } = await supabase.from("cart").insert([args]);
  if (error) {
    throw new Error(error.message);
  }
}
