import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { post } from "@/db/schema";
import { headers } from "next/headers";

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
