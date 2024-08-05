"use server";
import { uploadFiles } from "@/hooks/useFileUpload";
import { ServerClient } from "@/lib/supabasessr";
import { Tables } from "@/types/database.types";

export async function InsertLecture(
  section_id: number,
  description: string | null,
  order: number,
  notes: string | null,
  title: string | null,
  formData: FormData
  
): Promise<void> {
  const supabase = await ServerClient();
  const vid_url = await uploadFiles(formData);
  const video_url = vid_url['filevideo'];



  // Check if the lecture already exists
  const { data: existingLectures, error: fetchError } = await supabase
    .from('lectures')
    .select('*')
    .eq('section_id', section_id)
    .eq('order', order);

  if (fetchError) {
    throw new Error(fetchError.message);
  }

  // If lecture already exists, you can either skip insertion or handle it differently
  if (existingLectures.length > 0) {
    console.log('Lecture already exists, skipping insertion.');
    return;
  }

  // Insert new lecture
  const { error: insertError } = await supabase
    .from('lectures')
    .insert([
      {
        section_id,
        description,
        order,
        notes,
        title,
        video_url
      }
    ]);

  if (insertError) {
    throw new Error(insertError.message);
  }
}
