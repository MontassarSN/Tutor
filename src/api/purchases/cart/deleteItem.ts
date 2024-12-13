"use server";

import { ServerClient } from "@/lib/supabasessr";

export default async function deleteCartItem(Id: string): Promise<any> {
  const supabase = await ServerClient();

  const { data, error } = await supabase
    .from("cart")
    .delete()
    .eq("id", Id);

  if (error) {
    throw new Error(`Failed to delete item: ${error.message}`);
  }

  return data;
}
