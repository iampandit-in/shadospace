import { upload } from "@vercel/blob/client";

/**
 * Uploads a file directly from the client to Vercel Blob.
 * Bypasses serverless body size limits (e.g. 1MB).
 */
export async function uploadImageClient(
  file: File,
  folder: string = "uploads",
) {
  const pathname = `${folder}/${file.name}`;
  const newBlob = await upload(pathname, file, {
    access: "public",
    handleUploadUrl: "/api/avatar/upload",
  });
  return newBlob.url;
}
