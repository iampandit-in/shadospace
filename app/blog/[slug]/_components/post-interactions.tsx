"use client";

import { useEffect, useState } from "react";
import {
  Eye,
  Share2,
  Twitter,
  Linkedin,
  Link2,
  Check,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  incrementViews,
  toggleLike,
  getLikeStatus,
  getLikesCount,
} from "@/server/posts";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

interface PostInteractionsProps {
  postId: string;
  slug: string;
  title: string;
  initialViews: number;
}

export function PostInteractions({
  postId,
  slug,
  title,
  initialViews,
}: PostInteractionsProps) {
  const [views, setViews] = useState(initialViews);
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        await incrementViews(postId);
        setViews((prev) => prev + 1);

        const [status, count] = await Promise.all([
          getLikeStatus(postId),
          getLikesCount(postId),
        ]);

        setIsLiked(status.liked);
        setLikes(count);
      } catch (error) {
        console.error("Failed to initialize interactions:", error);
      }
    };

    init();
  }, [postId]);

  const handleLike = async () => {
    try {
      // Optimistic update
      const newLikedStatus = !isLiked;
      setIsLiked(newLikedStatus);
      setLikes((prev) => (newLikedStatus ? prev + 1 : prev - 1));

      const result = await toggleLike(postId);
      if (result.liked !== newLikedStatus) {
        // Rollback if server state is different
        setIsLiked(result.liked);
        setLikes((prev) => (result.liked ? prev + 1 : prev - 1));
      }
    } catch (error) {
      toast.error("Sign in to like this post" + error);
      // Rollback
      setIsLiked(isLiked);
      setLikes(likes);
    }
  };

  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/blog/${slug}`
      : "";

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast.success("Link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const shareTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURI(shareUrl)}`,
      "_blank",
    );
  };

  const shareLinkedin = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURI(shareUrl)}`,
      "_blank",
    );
  };

  return (
    <div className="flex items-center gap-4 py-6 ">
      <div className="flex border border-border/50 items-center gap-1.5 p-1 rounded-md bg-muted/30">
        {/* Views */}
        <div className="flex items-center gap-2 pr-4 pl-3 py-1.5">
          <Eye className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-semibold tabular-nums">
            {views.toLocaleString()}
          </span>
        </div>
        {/* Likes */}
        <button
          onClick={handleLike}
          className={cn(
            "flex items-center gap-2 px-4 py-1.5 rounded-md transition-all duration-300 active:scale-95 group",
            isLiked
              ? "bg-red-500/10 text-red-500"
              : "hover:bg-muted-foreground/10 text-muted-foreground",
          )}
        >
          <Heart
            className={cn(
              "h-4 w-4 transition-transform duration-300 group-hover:scale-110",
              isLiked && "fill-current scale-110",
            )}
          />
          <span className="text-sm font-semibold tabular-nums">
            {likes.toLocaleString()}
          </span>
        </button>
      </div>

      <div className="flex-1" />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="default"
            className="rounded-full gap-2 text-muted-foreground hover:text-primary hover:bg-primary/5 border border-transparent hover:border-primary/20 transition-all"
          >
            <Share2 className="h-4 w-4" />
            <span className="hidden sm:inline">Share</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-56 p-2 rounded-2xl border-border/50 backdrop-blur-xl bg-background/95"
        >
          <DropdownMenuItem
            onClick={shareTwitter}
            className="gap-3 p-3 rounded-xl cursor-pointer focus:bg-primary/5 focus:text-primary transition-colors"
          >
            <div className="p-2 rounded-lg bg-[#1DA1F2]/10">
              <Twitter className="h-4 w-4 text-[#1DA1F2]" />
            </div>
            <span className="font-medium">Twitter / X</span>
          </DropdownMenuItem>
          <div className="h-px bg-border/50 my-1 mx-2" />
          <DropdownMenuItem
            onClick={copyLink}
            className="gap-3 p-3 rounded-xl cursor-pointer focus:bg-primary/5 focus:text-primary transition-colors"
          >
            <div className="p-2 rounded-lg bg-muted">
              {copied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Link2 className="h-4 w-4" />
              )}
            </div>
            <span className="font-medium">Copy Page Link</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
