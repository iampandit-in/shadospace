"use client";

import { Button } from "@/components/ui/button";
import { deletePost } from "@/server/posts";
import { Loader2, Trash } from "lucide-react";
import * as React from "react";
import { toast } from "sonner";

interface DeletePostButtonProps {
  postId: string;
}

export function DeletePostButton({ postId }: DeletePostButtonProps) {
  const [isPending, startTransition] = React.useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      try {
        toast.loading("Deleting post...");
        const result = await deletePost(postId);
        if (result.success) {
          toast.dismiss();
          toast.success(result.message);
        } else {
          toast.dismiss();
          toast.error(result.message);
        }
      } catch (error) {
        toast.dismiss();
        toast.error("An unexpected error occurred while deleting the post.");
        console.error("Delete error:", error);
      }
    });
  };

  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={handleDelete}
      disabled={isPending}
      aria-label="Delete post"
    >
      {isPending ? <Loader2 /> : <Trash className="text-red-500" />}
    </Button>
  );
}
