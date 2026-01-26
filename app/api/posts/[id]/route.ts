import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { post } from "@/db/schema";
import { headers } from "next/headers";
import { eq, and } from "drizzle-orm";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const result = await db.query.post.findFirst({
      where: eq(post.id, id),
      with: {
        author: true,
      },
    });

    if (!result) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    const { title, content, image, status, category } = body;

    // Verify ownership
    const existingPost = await db.query.post.findFirst({
      where: and(eq(post.id, id), eq(post.userId, session.user.id)),
    });

    if (!existingPost) {
      return NextResponse.json(
        { error: "Unauthorized or Post not found" },
        { status: 403 },
      );
    }

    const updatedPost = await db
      .update(post)
      .set({
        title,
        content,
        image,
        status,
        category,
        updatedAt: new Date(),
      })
      .where(eq(post.id, id))
      .returning();

    return NextResponse.json(updatedPost[0]);
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    // Verify ownership
    const existingPost = await db.query.post.findFirst({
      where: and(eq(post.id, id), eq(post.userId, session.user.id)),
    });

    if (!existingPost) {
      return NextResponse.json(
        { error: "Unauthorized or Post not found" },
        { status: 403 },
      );
    }

    await db.delete(post).where(eq(post.id, id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
