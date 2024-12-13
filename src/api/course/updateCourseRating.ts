"use server";
import { ServerClient } from "@/lib/supabasessr";

export async function UpdateCourserating(
  id: string,
  rating: number,
  numberOfRatings: number
) {
  const supabase = await ServerClient();

  const { error } = await supabase
    .from("courses")
    .update({ rating: rating, numberOfRatings: numberOfRatings })
    .eq("id", id);

  if (error) {
    console.error(error.message);
    throw new Error(`Error updating course: ${error.message}`);
  }
}
