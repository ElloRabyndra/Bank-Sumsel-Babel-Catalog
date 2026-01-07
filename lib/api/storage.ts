import { supabase } from '@/lib/supabase';

/**
 * Upload image to Supabase Storage
 * @param file - File to upload
 * @param bucket - Storage bucket name (default: 'catalog-images')
 * @param folder - Optional folder path
 * @returns Public URL of uploaded image
 */
export async function uploadImage(
  file: File,
  bucket: string = 'catalog-images',
  folder?: string
): Promise<string> {
  try {
    // Generate unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = folder ? `${folder}/${fileName}` : fileName;

    // Upload file
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) throw error;

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(data.path);

    return publicUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}

/**
 * Upload multiple images
 */
export async function uploadImages(
  files: File[],
  bucket: string = 'catalog-images',
  folder?: string
): Promise<string[]> {
  const uploadPromises = files.map(file => uploadImage(file, bucket, folder));
  return Promise.all(uploadPromises);
}

/**
 * Delete image from Supabase Storage
 */
export async function deleteImage(url: string, bucket: string = 'catalog-images'): Promise<void> {
  try {
    // Extract path from URL
    const urlParts = url.split(`${bucket}/`);
    if (urlParts.length < 2) return;
    
    const filePath = urlParts[1];

    const { error } = await supabase.storage
      .from(bucket)
      .remove([filePath]);

    if (error) throw error;
  } catch (error) {
    console.error('Error deleting image:', error);
    throw error;
  }
}

/**
 * Convert base64 to File object (for rich text editor images)
 */
export function base64ToFile(base64: string, filename: string): File {
  const arr = base64.split(',');
  const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/png';
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  
  return new File([u8arr], filename, { type: mime });
}

/**
 * Upload base64 image (for rich text editor)
 */
export async function uploadBase64Image(
  base64: string,
  bucket: string = 'catalog-images',
  folder?: string
): Promise<string> {
  const file = base64ToFile(base64, `image-${Date.now()}.png`);
  return uploadImage(file, bucket, folder);
}