"use client";

import { useQuery } from "@tanstack/react-query";
import { getUserPosts } from "@/server/posts";
import { getUserByUsername } from "@/server/users";
import { Filter } from "lucide-react";
import { PostCard } from "@/components/posts/post-card";
import { PostCardSkeleton } from "@/components/posts/post-card-skeleton";
import { PostWithUser } from "@/types";
import { UserProfileHeader } from "@/components/profile/user-profile-header";
import { Skeleton } from "@/components/ui/skeleton";
import { use } from "react";

export default function UserProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = use(params);

  const {
    data: userData,
    isLoading: loadingUser,
    isError,
  } = useQuery({
    queryKey: ["user", "username", username],
    queryFn: async () => {
      const response = await getUserByUsername(username);
      return response.success && response.user ? response.user : null;
    },
    enabled: !!username,
  });

  const { data: postData = [], isLoading: loadingPosts } = useQuery({
    queryKey: ["posts", "user", userData?.id],
    queryFn: async () => {
      if (!userData?.id) return [];
      const response = await getUserPosts(userData.id);
      return response.success && response.posts
        ? (response.posts as unknown as PostWithUser[])
        : [];
    },
    enabled: !!userData?.id,
  });

  if (isError || (userData === null && !loadingUser)) {
    return (
      <div className="container mt-8 text-center">
        <h1 className="text-2xl font-bold mb-4">User not found</h1>
        <p className="text-muted-foreground">
          The user @{username} does not exist or has been removed.
        </p>
      </div>
    );
  }

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

        {loadingPosts || loadingUser ? (
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
              @{username} hasn&apos;t posted anything yet.
            </p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
            {postData.map((post) => (
              <PostCard key={post.post.id} post={post} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
