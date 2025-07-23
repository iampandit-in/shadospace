"use server";

import db from "@/db";
import { post } from "@/db/schema";
import { auth } from "@/lib/auth";
import { randomUUID } from "crypto";
import { headers } from "next/headers";
import { put } from '@vercel/blob';

export async function CreatePost(formData: FormData) {
  const session = await auth.api.getSession({
      headers: await headers()
    });
  if (!session?.user) {
    throw new Error("Not authenticated");
  }

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const image = formData.get("image") as File || "";   
  const blob = await put(image.name, image, {
    access: "public",
    addRandomSuffix: true,
  })
  // Generate a unique ID for the post
  const id = randomUUID();

  await db.insert(post).values({
    id,
    title,
    content,
    image: blob.url,
    // Use the session user ID for the userId field
    userId: session.user.id,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
}