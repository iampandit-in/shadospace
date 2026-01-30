"use server";

import { db } from "@/db";
import { post, category } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { desc, eq, sql } from "drizzle-orm";
import { slugify } from "@/lib/utils";

export async function getPosts() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Unauthorized");
  }

  const posts = await db.query.post.findMany({
    with: {
      category: true,
      author: true,
    },
    orderBy: [desc(post.createdAt)],
  });

  return posts;
}

export async function getPostBySlug(slug: string) {
  const postData = await db.query.post.findFirst({
    where: eq(post.slug, slug),
    with: {
      category: true,
      author: true,
    },
  });

  return postData;
}

export async function createPost(data: {
  title: string;
  content: string;
  description?: string;
  image?: string;
  categoryId?: string;
  status?: "draft" | "published";
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Unauthorized");
  }

  const id = crypto.randomUUID();
  const baseSlug = slugify(data.title);
  const slug = `${baseSlug}-${id.slice(0, 5)}`;

  await db.insert(post).values({
    id,
    title: data.title,
    slug,
    content: data.content,
    description: data.description,
    image: data.image,
    status: data.status || "draft",
    authorId: session.user.id,
    categoryId: data.categoryId,
  });

  return { id, slug };
}

export async function getCategories() {
  const categories = await db.query.category.findMany({
    extras: {
      postCount:
        sql<number>`(SELECT count(*) FROM ${post} WHERE ${post.categoryId} = ${category.id})`.as(
          "post_count",
        ),
    },
    orderBy: [desc(category.createdAt)],
  });
  return categories;
}

export async function createCategory(data: {
  name: string;
  slug: string;
  description?: string;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Unauthorized");
  }

  const id = crypto.randomUUID();
  await db.insert(category).values({
    id,
    name: data.name,
    slug: data.slug || slugify(data.name),
    description: data.description,
  });

  return { id };
}

export async function deleteCategory(id: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Unauthorized");
  }

  await db.delete(category).where(eq(category.id, id));
  return { success: true };
}
