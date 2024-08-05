"use server";
import { ServerClient } from "@/lib/supabasessr";
import { uploadFiles } from "@/hooks/useFileUpload";
import { TablesUpdate } from "@/types/database.types";

export async function UpdateUser(args: TablesUpdate<"users">, formData: FormData) {
  // Upload files and get the URLs
  const picUrls = await uploadFiles(formData);

  // Initialize Supabase client
  const supabase = await ServerClient();

  // Get the current session
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  // Check for session error
  if (sessionError) {
    throw new Error(`Session error: ${sessionError.message}`);
  }

  // Ensure session exists and has a user ID
  if (!session || !session.user) {
    throw new Error("No user session found");
  }

  // Check if the picUrls object has the expected key (assuming 'filepicture' is the key)
  const picUrl = picUrls['filepicture'];
  if (!picUrl) {
    throw new Error("Picture URL not found after upload");
  }

  // Update user data
  const { error } = await supabase
    .from("users")
    .update({ ...args, pic: picUrl })
    .eq("user_id", session.user.id);

  // Check for update error
  if (error) {
    throw new Error(`Update error: ${error.message}`);
  }
}
