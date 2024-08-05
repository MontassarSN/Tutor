"use server";
import { ServerClient } from "@/lib/supabasessr";

export async function InsertSection(course_id: number, title: string | null, order: number): Promise<void> {
  const supabase = await ServerClient();

  // Check if the section already exists
  const { data: existingSections, error: fetchError } = await supabase
    .from('sections')
    .select('*')
    .eq('course_id', course_id)
    .eq('order', order);

  if (fetchError) {
    throw new Error(fetchError.message);
  }

  // If section already exists, you can either skip insertion or handle it differently
  if (existingSections.length > 0) {
    console.log('Section already exists, skipping insertion.');
    return;
  }

  // Insert new section
  const { error: insertError } = await supabase
    .from('sections')
    .insert([
      {
        course_id,
        order,
        title
      }
    ]);

  if (insertError) {
    throw new Error(insertError.message);
  }
}
