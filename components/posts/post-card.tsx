"use client";

import Link from "next/link";
import Image from "next/image";
import { PostWithUser } from "@/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowRight, ImageOff, Pencil } from "lucide-react";
import { DeletePostButton } from "./delete-post-button";

interface PostCardProps {
  post: PostWithUser;
  showActions?: boolean;
}

export function PostCard({ post, showActions = false }: PostCardProps) {
  return (
    <article>
      <div>
        {post.post.image ? (
          <Link href={`/post/${post.post.id}`} className="block">
            <div>
              <Image
                src={post.post.image}
                alt={post.post.title}
                width={500}
                height={500}
                unoptimized
                className="object-cover rounded-md h-38"
              />
            </div>
          </Link>
        ) : (
          <div className="border rounded-md h-38 w-full object-cover flex items-center justify-center">
            <ImageOff className="opacity-50" />
          </div>
        )}

        <div className="flex-1 mt-2">
          <Link href={`/post/${post.post.id}`}>
            <h3 className="text-base font-medium line-clamp-3 leading-tight">
              {post.post.title}
            </h3>
          </Link>
        </div>

        <div className="mt-2 text-muted-foreground flex items-center justify-between gap-2">
          <Link
            href={`/users/user/${post.user.id}`}
            className="flex items-center gap-2"
          >
            <Avatar className="h-7 w-7">
              <AvatarImage
                src={post.user.image || "https://github.com/shadcn.png"}
              />
              <AvatarFallback className="bg-primary/10 text-primary uppercase text-xs">
                {post.user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">
                {showActions ? `@${post.user.username}` : post.user.name}
              </span>
              <div className="flex items-center text-[10px] text-muted-foreground uppercase tracking-wider">
                {new Date(post.post.createdAt).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </div>
            </div>
          </Link>
          {showActions ? (
            <div className="flex items-center gap-2">
              <Button className="cursor-pointer" size="icon" asChild>
                <Link href={`/edit/post/${post.post.id}`}>
                  <Pencil size={14} />
                </Link>
              </Button>
              <DeletePostButton postId={post.post.id} />
            </div>
          ) : (
            <Button variant="ghost" size="icon" asChild>
              <Link href={`/post/${post.post.id}`}>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
