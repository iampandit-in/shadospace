import { getPostById } from "@/server/posts";
import { PostView } from "@/components/posts/post-view";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { PostWithUser } from "@/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const response = await getPostById(id);

  if (
    !response.success ||
    !response.singlePost ||
    response.singlePost.length === 0
  ) {
    return {
      title: "Post Not Found",
    };
  }

  const postData = response.singlePost[0] as PostWithUser;

  return {
    title: postData.post.title,
    description: postData.post.content
      .substring(0, 160)
      .replace(/<[^>]*>/g, ""),
    openGraph: {
      title: postData.post.title,
      description: postData.post.content
        .substring(0, 160)
        .replace(/<[^>]*>/g, ""),
      images: postData.post.image ? [postData.post.image] : [],
      type: "article",
      publishedTime: postData.post.createdAt.toISOString(),
      authors: [postData.user.name],
    },
    twitter: {
      card: "summary_large_image",
      title: postData.post.title,
      description: postData.post.content
        .substring(0, 160)
        .replace(/<[^>]*>/g, ""),
      images: postData.post.image ? [postData.post.image] : [],
    },
  };
}

export default async function SinglePostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [response, session] = await Promise.all([
    getPostById(id),
    auth.api.getSession({
      headers: await headers(),
    }),
  ]);

  if (
    !response.success ||
    !response.singlePost ||
    response.singlePost.length === 0
  ) {
    notFound();
  }

  const postData = response.singlePost[0] as PostWithUser;

  return <PostView postData={postData} currentUserId={session?.user.id} />;
}
