"use client";

import { useQuery } from "@tanstack/react-query";
import { getUserPosts } from "@/server/posts";
import { getUserById } from "@/server/users";
import { Filter } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { PostCard } from "@/components/posts/post-card";
import { PostCardSkeleton } from "@/components/posts/post-card-skeleton";
import { PostWithUser } from "@/types";
import { UserProfileHeader } from "@/components/profile/user-profile-header";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfilePage() {
  const { data: session } = authClient.useSession();
  const userId = session?.user?.id;

  const { data: userData, isLoading: loadingUser } = useQuery({
    queryKey: ["user", userId],
    queryFn: async () => {
      const response = await getUserById(userId!);
      return response.success && response.user ? response.user : null;
    },
    enabled: !!userId,
  });

  const { data: postData = [], isLoading: loadingPosts } = useQuery({
    queryKey: ["posts", "user", userId],
    queryFn: async () => {
      const response = await getUserPosts(userId!);
      return response.success && response.posts
        ? (response.posts as unknown as PostWithUser[])
        : [];
    },
    enabled: !!userId,
  });

  return (
    <div className="mt-2 container">
      <main>
        {loadingUser ? (
          <div className="bg-card rounded-2xl border shadow-sm p-6 mb-8 flex flex-col md:flex-row items-center md:items-start gap-6">
            <Skeleton className="h-24 w-24 rounded-full shrink-0" />
            <div className="flex flex-col items-center md:items-start w-full gap-2 md:mt-1">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-5 w-32" />
              <div className="flex gap-4 md:mt-2">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-5 w-24" />
              </div>
            </div>
          </div>
        ) : userData ? (
          <UserProfileHeader user={userData} postCount={postData.length} />
        ) : null}

        {loadingPosts ? (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <PostCardSkeleton key={i} />
            ))}
          </div>
        ) : postData.length === 0 ? (
          <div className="text-center py-24 bg-card/30 rounded-3xl border border-dashed border-white/10">
            <Filter className="mx-auto h-12 w-12 text-muted-foreground/30 mb-4" />
            <h3 className="text-xl font-semibold mb-2">No posts found</h3>
            <p className="text-muted-foreground max-w-xs mx-auto mb-8">
              We couldn&apos;t find any posts matching your criteria.
            </p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 md:columns-3 gap-4">
            {postData.map((post) => (
              <PostCard key={post.post.id} post={post} showActions />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
