"use server";

import { put } from "@vercel/blob";

export async function uploadAvatar(formData: FormData) {
  const imageFile = formData.get("file") as File;

  if (!imageFile) {
    throw new Error("No file provided");
  }

  // Upload to Vercel Blob
  const blob = await put(imageFile.name, imageFile, {
    access: "public",
    addRandomSuffix: true,
  });

  return blob.url;
}
