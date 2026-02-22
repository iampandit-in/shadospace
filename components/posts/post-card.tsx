"use client";

import Link from "next/link";
import Image from "next/image";
import { PostWithUser } from "@/types";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowRight, Pencil, Trash } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import LoadingButton from "../utils/loading-button";
import { toast } from "sonner";
import { deletePost } from "@/server/posts";

interface PostCardProps {
  post: PostWithUser;
  showActions?: boolean;
}

export function PostCard({ post, showActions = false }: PostCardProps) {
  const queryClient = useQueryClient();
  const { mutate: handleDelete, isPending } = useMutation({
    mutationFn: async (postId: string) => {
      toast.loading("Deleting post...");
      return await deletePost(postId);
    },
    onSuccess: (result) => {
      toast.dismiss();
      if (result.success) {
        toast.success(result.message);
        queryClient.invalidateQueries({ queryKey: ["posts"] });
      } else {
        toast.error(result.message);
      }
    },
    onError: (error) => {
      toast.dismiss();
      toast.error("An unexpected error occurred while deleting the post.");
      console.error("Delete error:", error);
    },
  });
  return (
    <article className="break-inside-avoid mb-4">
      <div className="rounded-md border shadow-sm p-4 hover:bg-muted/30 transition-colors cursor-pointer block">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Link
              href={`/user/${post.user.username}`}
              className="shrink-0 h-fit"
            >
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={post.user.image || "https://github.com/shadcn.png"}
                />
                <AvatarFallback className="bg-primary/10 text-primary uppercase text-xs">
                  {post.user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </Link>
            <div className="flex-1 min-w-0">
              <div className="flex items-start sm:items-center justify-between w-full">
                <div className="flex flex-col items-start gap-1.5 text-sm mb-1 leading-none mr-2">
                  <div className="flex items-center gap-1.5">
                    <Link
                      href={`/user/${post.user.username}`}
                      className="font-semibold text-foreground hover:underline truncate"
                    >
                      {post.user.name}
                    </Link>
                    <span className="text-muted-foreground">·</span>
                    <span className="text-muted-foreground whitespace-nowrap">
                      {new Date(post.post.createdAt).toLocaleDateString(
                        "en-IN",
                        {
                          month: "short",
                          day: "numeric",
                        },
                      )}
                    </span>
                  </div>
                  <span className="text-muted-foreground truncate hidden sm:inline-block">
                    @{post.user.username}
                  </span>
                </div>
                <div className="flex items-center -mt-4 gap-2 rounded-full shrink-0">
                  {showActions && (
                    <>
                      <Button
                        variant="secondary"
                        className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted"
                        size="icon"
                        asChild
                      >
                        <Link href={`/edit/post/${post.post.id}`}>
                          <Pencil size={18} />
                        </Link>
                      </Button>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleDelete(post.post.id);
                        }}
                      >
                        <LoadingButton
                          variant="destructive"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                          loading={isPending}
                          icon={<Trash size={18} />}
                        />
                      </form>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <Link href={`/post/${post.post.id}`} className="block">
              <h3 className="text-[15px] leading-snug whitespace-pre-wrap wrap-break-word mb-2">
                {post.post.title}
              </h3>
            </Link>
            {post.post.image && (
              <Link href={`/post/${post.post.id}`} className="block mt-4">
                <div className="rounded-md overflow-hidden border">
                  <Image
                    src={post.post.image}
                    alt={post.post.title}
                    width={500}
                    height={500}
                    unoptimized
                    className="object-cover w-full max-h-[400px]"
                  />
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
