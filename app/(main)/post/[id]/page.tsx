"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getPostById } from "@/server/posts";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar } from "lucide-react";
import Tiptap from "@/components/tiptap/editor";

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
    return (
      <div className="py-10">
        <Skeleton className="h-12 w-full animate-pulse" />
        <Skeleton className="h-12 my-6 w-1/3 animate-pulse" />
        <Skeleton className="h-8 w-full animate-pulse" />
        <Skeleton className="h-8 mt-2 w-full animate-pulse" />
        <Skeleton className="h-8 mt-2 w-full animate-pulse" />
        <Skeleton className="h-8 mt-2 w-full animate-pulse" />
        <Skeleton className="h-8 mt-2 w-full animate-pulse" />
        <Skeleton className="h-8 mt-2 w-full animate-pulse" />
        <Skeleton className="h-8 mt-2 w-full animate-pulse" />
      </div>
    );
  }

  return (
    <div className="py-6">
      <h1 className="text-3xl font-bold mb-4">{postData.post.title}</h1>
      <div className="my-6">
        <div className="text-sm text-muted-foreground flex items-center gap-2">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage
                src={postData.user.image || "https://github.com/shadcn.png"}
              />
              <AvatarFallback>{postData.user.name[0]}</AvatarFallback>
            </Avatar>
            <span>
              <p>@{postData.user.username}</p>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="ml-2 h-4 w-4" />
            <span>
              {new Date(postData.post.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <Tiptap content={postData.post.content} readOnly={true} />
      </div>
    </div>
  );
}
