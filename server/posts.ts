"use server";

import { db } from "@/db";
import { post, category, comment, like } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { and, desc, eq, sql, ilike, or } from "drizzle-orm";
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

export async function deletePost(id: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Unauthorized");
  }

  await db.delete(post).where(eq(post.id, id));
  return { success: true };
}

export async function getPostById(id: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Unauthorized");
  }

  const postData = await db.query.post.findFirst({
    where: eq(post.id, id),
    with: {
      category: true,
    },
  });

  return postData;
}

export async function updatePost(
  id: string,
  data: {
    title: string;
    content: string;
    description?: string;
    image?: string;
    categoryId?: string;
    status?: "draft" | "published";
  },
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Unauthorized");
  }

  await db
    .update(post)
    .set({
      title: data.title,
      content: data.content,
      description: data.description,
      image: data.image,
      categoryId: data.categoryId,
      status: data.status,
      updatedAt: new Date(),
    })
    .where(eq(post.id, id));

  return { success: true };
}

export async function incrementViews(id: string) {
  await db
    .update(post)
    .set({
      views: sql`${post.views} + 1`,
    })
    .where(eq(post.id, id));

  return { success: true };
}

export async function getComments(postId: string) {
  const comments = await db.query.comment.findMany({
    where: eq(comment.postId, postId),
    with: {
      author: true,
    },
    orderBy: [desc(comment.createdAt)],
  });

  return comments;
}

export async function addComment(data: { postId: string; content: string }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Unauthorized");
  }

  const id = crypto.randomUUID();
  await db.insert(comment).values({
    id,
    content: data.content,
    postId: data.postId,
    authorId: session.user.id,
  });

  return { id };
}

export async function toggleLike(postId: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Unauthorized");
  }

  const existingLike = await db.query.like.findFirst({
    where: and(eq(like.postId, postId), eq(like.userId, session.user.id)),
  });

  if (existingLike) {
    await db.delete(like).where(eq(like.id, existingLike.id));
    return { liked: false };
  } else {
    await db.insert(like).values({
      id: crypto.randomUUID(),
      postId,
      userId: session.user.id,
    });
    return { liked: true };
  }
}

export async function getLikeStatus(postId: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return { liked: false };

  const existingLike = await db.query.like.findFirst({
    where: and(eq(like.postId, postId), eq(like.userId, session.user.id)),
  });

  return { liked: !!existingLike };
}

export async function getLikesCount(postId: string) {
  const result = await db
    .select({ count: sql<number>`count(*)` })
    .from(like)
    .where(eq(like.postId, postId));

  return result[0]?.count || 0;
}

export async function getPublicPosts(params?: {
  categorySlug?: string;
  search?: string;
}) {
  const whereConditions = [eq(post.status, "published")];

  if (params?.categorySlug) {
    const cat = await db.query.category.findFirst({
      where: eq(category.slug, params.categorySlug),
    });
    if (cat) {
      whereConditions.push(eq(post.categoryId, cat.id));
    }
  }

  if (params?.search) {
    whereConditions.push(
      or(
        ilike(post.title, `%${params.search}%`),
        ilike(post.description, `%${params.search || ""}%`),
      ) ?? sql`TRUE`,
    );
  }

  const posts = await db.query.post.findMany({
    where: and(...whereConditions),
    with: {
      category: true,
      author: true,
    },
    orderBy: [desc(post.createdAt)],
  });

  return posts;
}

export async function getPublicCategories() {
  const categories = await db.query.category.findMany({
    extras: {
      postCount:
        sql<number>`(SELECT count(*) FROM ${post} WHERE ${post.categoryId} = ${category.id} AND ${post.status} = 'published')`.as(
          "post_count",
        ),
    },
    orderBy: [desc(category.createdAt)],
  });
  return categories;
}
