"use server";

import { db } from "@/db";
import { post, user } from "@/db/schema";
import { auth } from "@/lib/auth";
import { desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function createPost(
  title: string,
  content: string,
  image?: string,
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userId = session?.user.id;
  if (!userId) {
    throw new Error("Unauthorized");
  }
  try {
    await db.insert(post).values({
      id: crypto.randomUUID(),
      userId,
      title,
      content,
      image,
    });
    revalidatePath("/profile");
    return {
      success: true,
      message: "post created successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "error creating post" + error,
    };
  }
}

export async function editPost(
  title: string,
  content: string,
  postId: string,
  image?: string,
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userId = session?.user.id;
  if (!userId) {
    throw new Error("Unauthorized");
  }
  try {
    await db
      .update(post)
      .set({
        title,
        content,
        image,
      })
      .where(eq(post.id, postId));
    revalidatePath("/profile");
    return {
      success: true,
      message: "post updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "error updating post" + error,
    };
  }
}

export async function saveContent(content: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userId = session?.user.id;
  if (!userId) {
    throw new Error("Unauthorized");
  }
  try {
    await db.update(post).set({
      content,
    });
    return {
      success: true,
      message: "post updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "error updating post" + error,
    };
  }
}

export async function getPosts() {
  try {
    const posts = await db
      .select()
      .from(post)
      .orderBy(desc(post.createdAt))
      .innerJoin(user, eq(post.userId, user.id));
    return {
      success: true,
      message: "posts fetched successfully",
      posts,
    };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return {
      success: false,
      message: "error fetching posts" + error,
    };
  }
}

export async function getUserPosts(userId: string) {
  if (!userId) {
    throw new Error("Unauthorized");
  }
  try {
    const posts = await db
      .select()
      .from(post)
      .orderBy(desc(post.createdAt))
      .innerJoin(user, eq(post.userId, user.id))
      .where(eq(post.userId, userId));
    return {
      success: true,
      message: "posts fetched successfully",
      posts,
    };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return {
      success: false,
      message: "error fetching posts" + error,
    };
  }
}

export async function getPostById(postId: string) {
  try {
    const singlePost = await db
      .select()
      .from(post)
      .innerJoin(user, eq(post.userId, user.id))
      .where(eq(post.id, postId));
    return {
      success: true,
      message: "post fetched successfully",
      singlePost,
    };
  } catch (error) {
    console.error("Error fetching post:", error);
    return {
      success: false,
      message: "error fetching post" + error,
    };
  }
}

export async function deletePost(postId: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userId = session?.user.id;
  if (!userId) {
    return { success: false, message: "Unauthorized" };
  }

  try {
    await db.delete(post).where(eq(post.id, postId));
    revalidatePath("/profile");
    return {
      success: true,
      message: "post deleted successfully",
    };
  } catch (error) {
    return {
      success: false,
      message:
        "error deleting post: " +
        (error instanceof Error ? error.message : String(error)),
    };
  }
}
