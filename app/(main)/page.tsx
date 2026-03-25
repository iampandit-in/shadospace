"use client";

import PostCard, { type PostWithAuthor } from "@/components/posts/post-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getPostsAction } from "@/lib/actions/post";
import PostCardSkeleton from "@/components/posts/post-card-skeleton";

export default function Home() {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: () => getPostsAction(),
  });

  return (
    <main>
      <div className="flex items-center justify-between mb-6 md:mt-6">
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">
            Feed
          </h1>
          <p className="hidden md:block text-sm text-muted-foreground mt-1">
            Discover what&apos;s happening in the Shadospace.
          </p>
        </div>
        <Button className="cursor-pointer" variant="default">
          <Link href="/create/post">Create post</Link>
        </Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <PostCardSkeleton />
          <PostCardSkeleton />
          <PostCardSkeleton />
        </div>
      ) : posts && posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post: PostWithAuthor) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border-2 border-dashed rounded-2xl bg-muted/30">
          <h3 className="text-lg font-medium">No posts yet</h3>
          <p className="text-muted-foreground mb-6">
            Be the first to share something amazing!
          </p>
          <Button variant="outline">
            <Link href="/create/post">Create your first post</Link>
          </Button>
        </div>
      )}
    </main>
  );
}
