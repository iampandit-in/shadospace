"use server";

import { db } from "@/db";
import { post, user } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function createPost(title: string, content: string) {
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

export async function editPost(title: string, content: string, postId: string) {
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

export async function getPosts() {
  try {
    const posts = await db
      .select()
      .from(post)
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

export async function getPostById(postId: string) {
  try {
    const singlePost = await db
      .select()
      .from(post)
      .innerJoin(user, eq(post.userId, user.id))
      .where(eq(post.id, postId));
    revalidatePath("/profile");
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
    // Check if the post belongs to the user
    const existingPost = await db
      .select()
      .from(post)
      .where(eq(post.id, postId))
      .limit(1);

    if (existingPost.length === 0) {
      return { success: false, message: "Post not found" };
    }

    if (existingPost[0].userId !== userId) {
      return {
        success: false,
        message: "You are not authorized to delete this post",
      };
    }

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
