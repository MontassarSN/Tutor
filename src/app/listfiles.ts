import { supabase } from "../lib/supabaseClient";

// Define types for FileObject and FolderObject
type FileObject = {
  name: string;
};

type FolderObject = {
  name: string;
};

async function listFilesRecursively(
  folder = ""
): Promise<{ name: string; url: string }[]> {
  const { data, error } = await supabase.storage
    .from("pictures")
    .list(folder, { limit: 1000 });

  if (error) {
    console.error(`Error listing files in folder ${folder}:`, error.message);
    return [];
  }

  const files: { name: string; url: string }[] = [];
  const subfolderPromises: Promise<{ name: string; url: string }[]>[] = [];

  for (const item of data) {
    // Check if the item is a file
    if ("name" in item && "url" in item) {
      const file = item as FileObject;
      const publicUrl = await supabase.storage
        .from("pictures")
        .getPublicUrl(`${folder}/${file.name}`);
      files.push({
        name: `${folder}/${file.name}`,
        url: publicUrl.data?.publicUrl || "",
      });
    } else if ("name" in item) {
      const subfolder = item as FolderObject;
      subfolderPromises.push(
        listFilesRecursively(`${folder}/${subfolder.name}`)
      );
    }
  }

  const subfolderFiles = await Promise.all(subfolderPromises);
  return files.concat(...subfolderFiles);
}

async function listAllFiles() {
  const fileUrls = await listFilesRecursively();
  console.log("File URLs:", fileUrls);
  return fileUrls;
}

listAllFiles();
