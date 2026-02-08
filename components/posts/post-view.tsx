"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Pencil } from "lucide-react";
import Tiptap from "@/components/tiptap/editor";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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

interface PostViewProps {
  postData: PostWithUser;
  currentUserId?: string;
}

export function PostView({ postData, currentUserId }: PostViewProps) {
  return (
    <div className="py-6 space-y-8">
      {postData.post.image && (
        <div className="relative w-full h-[40vh] md:h-[50vh] rounded-2xl overflow-hidden border">
          <Image
            src={postData.post.image}
            alt={postData.post.title}
            fill
            priority
            unoptimized
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />
          {currentUserId === postData.user.id && (
            <Button
              size="icon"
              variant="outline"
              className="absolute top-6 right-6 z-20 cursor-pointer"
              asChild
            >
              <Link href={`/edit/post/${postData.post.id}`}>
                <Pencil size="8" />
              </Link>
            </Button>
          )}
          <div className="absolute inset-x-0 bottom-0 p-6 md:p-10 space-y-4">
            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
              {postData.post.title}
            </h1>
            <div className="flex items-center gap-4 text-white/90">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8 border border-white/20">
                  <AvatarImage
                    src={postData.user.image || "https://github.com/shadcn.png"}
                  />
                  <AvatarFallback>{postData.user.name[0]}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">
                  @{postData.user.username}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4" />
                <span>
                  {new Date(postData.post.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className={cn(!postData.post.image && "space-y-6")}>
        {!postData.post.image && (
          <>
            <h1 className="text-4xl font-bold">{postData.post.title}</h1>
            <div className="flex items-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={postData.user.image || "https://github.com/shadcn.png"}
                  />
                  <AvatarFallback>{postData.user.name[0]}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">
                  @{postData.user.username}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4" />
                <span>
                  {new Date(postData.post.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </>
        )}
        <div className="mt-8 prose-lg">
          <Tiptap content={postData.post.content} readOnly={true} />
        </div>
      </div>
    </div>
  );
}
