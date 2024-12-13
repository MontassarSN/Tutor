"use server";

import { ServerClient } from "@/lib/supabasessr";
import { Tables } from "@/types/database.types";

export default async function purchaseItems(items: Tables<"cart">[]) {
  const supabase = await ServerClient();

  try {
    const insertPromise = supabase.from("purchases").insert(items);

    const deletePromise = supabase
      .from("cart")
      .delete()
      .in(
        "id",
        items.map((item) => item.id)
      ); 

    const [insertResult, deleteResult] = await Promise.all([
      insertPromise,
      deletePromise,
    ]);

    if (insertResult.error) {
      throw new Error(`Insert Error: ${insertResult.error.message}`);
    }

    // Check for errors in the delete operation
    if (deleteResult.error) {
      throw new Error(`Delete Error: ${deleteResult.error.message}`);
    }

    return { success: true, message: "Items moved to purchases successfully!" };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Operation Failed: ${error.message}`);
    } else {
      throw new Error("Operation Failed: Unknown error");
    }
  }
}
