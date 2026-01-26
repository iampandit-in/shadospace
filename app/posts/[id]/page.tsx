"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, ArrowLeft, Calendar, User } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

interface Post {
  id: string;
  title: string;
  content: string;
  image: string | null;
  category: string;
  createdAt: string;
  author: {
    name: string;
    image: string | null;
  };
}

export default function PostPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [post, setPost] = React.useState<Post | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchPost() {
      try {
        const response = await fetch(`/api/posts/${id}`);
        if (!response.ok) throw new Error("Post not found");
        const data = await response.json();
        setPost(data);
      } catch (error) {
        toast.error("Failed to load post");
        router.push("/");
      } finally {
        setIsLoading(false);
      }
    }
    if (id) fetchPost();
  }, [id, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!post) return null;

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <Link href="/">
        <Button variant="ghost" size="sm" className="mb-8 cursor-pointer">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to feed
        </Button>
      </Link>

      <article className="space-y-8">
        <div className="space-y-4 text-center">
          <Badge className="capitalize" variant="secondary">
            {post.category}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            {post.title}
          </h1>
          <div className="flex items-center justify-center gap-4 text-muted-foreground">
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{post.author.name}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {post.image && (
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl border">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div
          className="prose prose-lg dark:prose-invert max-w-none pt-8 border-t"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </div>
  );
}
