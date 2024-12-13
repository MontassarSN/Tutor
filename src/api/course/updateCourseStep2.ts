"use server";
import { ServerClient } from "@/lib/supabasessr";
import { uploadFiles } from "@/hooks/useFileUpload";

export async function updateCourseStep2(
  formData: FormData,
  courseid: string,
  subjects: string[],
  audience: string[],
  requirements: string[]
): Promise<void> {

  // Upload files and get the URLs
  const picUrls = await uploadFiles(formData);

  // Initialize Supabase client
  const supabase = await ServerClient();

  const picUrl = picUrls['filepicture'];
  const vidUrl = picUrls['filevid'];

  // Prepare the update object
  const updateData: any = {
    subjects,
    requirements,
    audience,
    description: String(formData.get("description"))
  };

  // Conditionally add pic and trailer URLs if they exist
  if (picUrl) {
    updateData.pic = picUrl;
  }
  console.log("🚀 ~ picUrl:", picUrl)

  
  if (vidUrl) {
    updateData.trailer = vidUrl;
  }
  console.log(updateData);

  // Update the course data
  const { error } = await supabase
    .from("courses")
    .update(updateData)
    .eq("id", courseid);
  if (error) {
    throw new Error(`Update error: ${error.message}`);
  }
}
  console.log("🚀 ~ console:", console)
