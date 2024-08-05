"use server";
import { ServerClient } from "@/lib/supabasessr";

export async function uploadFiles(formData: FormData): Promise<Record<string, string>> {
  const supabase = await ServerClient();
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError) {
    throw new Error(sessionError.message);
  }

  if (session?.user.id) {
    const fileUrls: Record<string, string> = {};

    // Create an array from FormData entries
    const entries = Array.from(formData.entries());

    for (const [key, value] of entries) {
      const file = value as File;

      // Check if the entry is a File
      if (file instanceof File) {
        // Replace 'undefined' with an empty string in the file name
        const fileName = file.name.endsWith('undefined') ? '' : file.name;
        const filePath = `${session.user.id}/${fileName}`;

        if (fileName) {
          // Upload the file to Supabase storage
          const { error: uploadError } = await supabase.storage
            .from("pictures")
            .upload(filePath, file);

          if (uploadError) {
            if (uploadError.message.includes("already exists")) {
              // Get the public URL if the file already exists
              const { data } = supabase.storage.from("pictures").getPublicUrl(filePath);
              fileUrls[key] = data.publicUrl;
            } else {
              throw uploadError;
            }
          } else {
            // Get the public URL of the uploaded file
            const { data } = supabase.storage.from("pictures").getPublicUrl(filePath);
            fileUrls[key] = data.publicUrl;
          }
        } else {
          // If fileName is empty, set the URL as an empty string
          fileUrls[key] = '';
        }
      } else {
        console.warn(`Skipping non-file entry: ${key}`);
      }
    }

    return fileUrls;
  }

  throw new Error("No session found");
}
