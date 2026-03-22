"use server";

import { db } from "@/db";
import { post, postLike, postView } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { eq, and, sql } from "drizzle-orm";
import { type JSONContent } from "@tiptap/react";
import { put } from "@vercel/blob";

export async function uploadImageAction(formData: FormData) {
  const file = formData.get("file") as File;
  if (!file) throw new Error("No file provided");

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const blob = await put(file.name, file, {
    access: "public",
    addRandomSuffix: true,
  });
  return blob;
}

export async function createPostAction(data: {
  title: string;
  contentJson: JSONContent;
  communityId?: string;
  coverImageUrl?: string;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const postId = crypto.randomUUID();

  await db.insert(post).values({
    id: postId,
    title: data.title,
    contentJson: data.contentJson,
    coverImageUrl: data.coverImageUrl || null,
    authorId: session.user.id,
  });

  return { id: postId };
}

export async function getPostsAction() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const posts = await db.query.post.findMany({
    orderBy: (posts, { desc }) => [desc(posts.createdAt)],
    with: {
      author: true,
      likes: true,
    },
  });

  return posts.map((p) => ({
    ...p,
    contentJson: p.contentJson as JSONContent,
    likeCount: p.likes.length,
    isLiked: session?.user
      ? p.likes.some((l) => l.userId === session.user.id)
      : false,
  }));
}

export async function toggleLikeAction(postId: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const existing = await db.query.postLike.findFirst({
    where: (postLike, { and, eq }) =>
      and(eq(postLike.postId, postId), eq(postLike.userId, session.user.id)),
  });

  if (existing) {
    await db
      .delete(postLike)
      .where(
        and(
          eq(postLike.postId, postId),
          eq(postLike.userId, session.user.id),
        ),
      );
    return { liked: false };
  } else {
    await db.insert(postLike).values({
      postId,
      userId: session.user.id,
    });
    return { liked: true };
  }
}

export async function getPostByIdAction(postId: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const p = await db.query.post.findFirst({
    where: eq(post.id, postId),
    with: {
      author: true,
      likes: true,
    },
  });

  if (!p) return null;

  return {
    ...p,
    contentJson: p.contentJson as JSONContent,
    likeCount: p.likes.length,
    isLiked: session?.user
      ? p.likes.some((l) => l.userId === session.user.id)
      : false,
  };
}

export async function incrementViewAction(postId: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) return;

  const existing = await db.query.postView.findFirst({
    where: (postView, { and, eq }) =>
      and(eq(postView.postId, postId), eq(postView.userId, session.user.id)),
  });

  if (!existing) {
    await db.insert(postView).values({
      postId,
      userId: session.user.id,
    });

    await db
      .update(post)
      .set({
        views: sql`${post.views} + 1`,
      })
      .where(eq(post.id, postId));
  }
}
