import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { post } from "@/db/schema";
import { headers } from "next/headers";
import { desc, ilike, or, and, eq } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search");
    const category = searchParams.get("category");
    const status = searchParams.get("status") || "published";

    const conditions = [];
    if (search) {
      conditions.push(
        or(
          ilike(post.title, `%${search}%`),
          ilike(post.content, `%${search}%`),
        ),
      );
    }
    if (category) {
      conditions.push(
        eq(post.category, category as "tutorial" | "project" | "practice"),
      );
    }
    if (status) {
      conditions.push(
        eq(
          post.status,
          status as
            | "draft"
            | "published"
            | "archived"
            | "deleted"
            | "archived"
            | "scheduled"
            | "in review",
        ),
      );
    }

    const posts = await db.query.post.findMany({
      where: conditions.length > 0 ? and(...conditions) : undefined,
      columns: {
        id: true,
        title: true,
        status: true,
        category: true,
        createdAt: true,
        userId: true,
        image: true,
        // We'll truncate this in the UI or fetch only a part if Drizzle supports it easily
        // but for now, we'll fetch the whole content if it's small,
        // or we can use a SQL transformation to truncate.
        content: true,
      },
      with: {
        author: {
          columns: {
            name: true,
            image: true,
          },
        },
      },
      orderBy: [desc(post.createdAt)],
    });

    // Manually truncate content to reduce payload size if it's huge
    const optimizedPosts = posts.map((p) => ({
      ...p,
      content:
        p.content.length > 300
          ? p.content.substring(0, 300) + "..."
          : p.content,
    }));

    return NextResponse.json(optimizedPosts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  console.log("POST /api/posts - started");
  try {
    console.log("Fetching session...");
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    console.log("Session fetched:", session ? "Authenticated" : "Unauthorized");

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log("Reading request body...");
    const body = await req.json();
    const { title, content, image, status, category } = body;
    console.log("Body read:", { title, status, category, hasImage: !!image });

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 },
      );
    }

    console.log("Inserting post into database...");
    const newPost = await db
      .insert(post)
      .values({
        id: crypto.randomUUID(),
        title,
        content,
        image,
        status: status || "draft",
        category: category || "tutorial",
        userId: session.user.id,
      })
      .returning();
    console.log("Post inserted successfully");

    return NextResponse.json(newPost[0]);
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
