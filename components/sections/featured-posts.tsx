import { PostCard, type Post } from "./post-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface FeaturedPostsProps {
  posts: Post[];
  title?: string;
  description?: string;
  showExploreAll?: boolean;
}

export function FeaturedPosts({
  posts,
  title = "Latest Insights",
  description = "Explore our most recent articles and tutorials.",
  showExploreAll = true,
}: FeaturedPostsProps) {
  if (posts.length === 0) {
    return (
      <section className="p-4 text-center">
        <h2 className="text-2xl font-bold mb-4">No results found</h2>
        <p className="text-muted-foreground">
          Try adjusting your search or category filters to find what you&apos;re
          looking for.
        </p>
      </section>
    );
  }

  return (
    <section className="p-4">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-2">{title}</h2>
          <p className="text-muted-foreground text-lg">{description}</p>
        </div>
        {showExploreAll && (
          <Button
            variant="ghost"
            className="group text-primary hover:text-primary hover:bg-primary/5 rounded-full"
            asChild
          >
            <Link href="/blog">
              Explore All Posts{" "}
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
