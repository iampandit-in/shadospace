"use server";

import db from "@/db";
import { post } from "@/db/schema";
import { auth } from "@/lib/auth";
import { randomUUID } from "crypto";
import { headers } from "next/headers";
import { put } from '@vercel/blob';
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function CreatePost(formData: FormData) {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  if (!session?.user) {
    throw new Error("Not authenticated");
  }

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const image = formData.get("image");

  let imageUrl = "";

  // If image is a File and has a size, upload it
  if (typeof image === "string" && image.trim() !== "") {
    imageUrl = image.trim();
  }

  // Generate a unique ID for the post
  const id = randomUUID();

  await db.insert(post).values({
    id,
    title,
    content,
    image: imageUrl,
    userId: session.user.id,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  revalidatePath("/");
  redirect("/");
}