"use client";

import { useEffect, useState } from "react";
import { getUserPosts } from "@/server/posts";
import { Filter } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { PostCard } from "@/components/posts/post-card";
import { PostCardSkeleton } from "@/components/posts/post-card-skeleton";
import { PostWithUser } from "@/types";

export default function ProfilePage() {
  const { data: session } = authClient.useSession();
  const [postData, setPostData] = useState<PostWithUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const userId = session?.user?.id;
      if (!userId) return;

      try {
        const response = await getUserPosts(userId);
        if (response.success && response.posts) {
          setPostData(response.posts as unknown as PostWithUser[]);
        } else {
          setPostData([]);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
        setPostData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [session?.user?.id]);

  return (
    <div className="mt-2 container">
      <main>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {postData.map((post) => (
              <PostCard key={post.post.id} post={post} showActions />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
