// utils/uploadFile.js
import { supabase } from "@/app/lib/supabaseClient";

export async function uploadFile(file, folder = "uploads") {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const filePath = `${folder}/${fileName}`;

  const { data, error } = await supabase.storage
    .from("appointments")
    .upload(filePath, file);

  if (error) throw error;

  const { data: publicUrl } = supabase
    .storage
    .from("appointments")
    .getPublicUrl(filePath);

  return publicUrl.publicUrl;
}
