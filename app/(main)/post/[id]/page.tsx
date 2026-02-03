"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getPostById } from "@/server/posts";

interface Post {
  id: string;
  image: string | null;
  title: string;
  content: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
  username: string | null;
  displayUsername: string | null;
}

interface PostWithUser {
  post: Post;
  user: User;
}

export default function SinglePostPage() {
  const { id } = useParams();
  const [postData, setPostData] = useState<PostWithUser | null>(null);
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await getPostById(id as string);
        if (
          response.success &&
          response.singlePost &&
          response.singlePost.length > 0
        ) {
          setPostData(response.singlePost[0] as PostWithUser);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchPost();
  }, [id]);
  if (!postData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-4">{postData.post.title}</h1>
      <div className="prose prose-invert max-w-none">
        {postData.post.content}
      </div>
      <div className="mt-8 pt-8 border-t border-white/10">
        <p className="text-sm text-muted-foreground">
          By {postData.user.name} on{" "}
          {new Date(postData.post.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
