import { JSONContent } from "@tiptap/react";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { ThumbsUpIcon, EyeIcon, Loader2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleLikeAction } from "@/lib/actions/post";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface PostCardProps {
  post: {
    id: string;
    title: string;
    contentJson: JSONContent;
    coverImageUrl?: string | null;
    createdAt: Date;
    likeCount: number;
    isLiked: boolean;
    views: number;
    author: {
      name: string;
      image?: string | null;
    };
  };
}

export type PostWithAuthor = PostCardProps["post"];

export default function PostCard({ post }: PostCardProps) {
  const queryClient = useQueryClient();

  const toggleLike = useMutation({
    mutationFn: () => toggleLikeAction(post.id),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["posts"] });
      const previousPosts = queryClient.getQueryData<PostWithAuthor[]>([
        "posts",
      ]);

      queryClient.setQueryData<PostWithAuthor[]>(["posts"], (old) =>
        old?.map((p) =>
          p.id === post.id
            ? {
                ...p,
                isLiked: !p.isLiked,
                likeCount: (p.likeCount ?? 0) + (p.isLiked ? -1 : 1),
              }
            : p,
        ),
      );

      return { previousPosts };
    },
    onError: (err, _, context) => {
      queryClient.setQueryData(["posts"], context?.previousPosts);
      if (err.message === "Unauthorized") {
        toast.error("Please sign in to like posts");
      } else {
        toast.error("Failed to update like");
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <div>
            {post.author.image && (
              <Avatar className="size-7">
                <AvatarImage
                  height={28}
                  width={28}
                  src={post.author.image}
                  alt={post.author.name}
                />
                <AvatarFallback className="size-6">
                  {post.author.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            )}
          </div>
          <div className="text-muted-foreground">
            <p className="text-xs">{post.author.name}</p>
            <p className="text-xs">
              {formatDistanceToNow(new Date(post.createdAt), {
                addSuffix: true,
              })}
            </p>
          </div>
        </div>
        <CardTitle className="line-clamp-2">{post.title}</CardTitle>
      </CardHeader>
      <CardContent className="grow">
        {post.coverImageUrl && (
          <Image
            height={400}
            width={400}
            src={post.coverImageUrl}
            alt={post.title}
            className="object-cover aspect-video rounded-md"
            unoptimized
          />
        )}
      </CardContent>
      <CardFooter className="flex items-center justify-between py-4 border-t bg-muted/5">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "cursor-pointer gap-2 flex items-center hover:text-primary transition-colors",
              post.isLiked && "text-primary bg-primary/10",
            )}
            onClick={() => toggleLike.mutate()}
            disabled={toggleLike.isPending}
          >
            {toggleLike.isPending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <ThumbsUpIcon
                className={cn("size-4", post.isLiked && "fill-current")}
              />
            )}
            <span className="font-medium">{post.likeCount ?? 0}</span>
          </Button>
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <EyeIcon className="size-4" />
            <span>{post.views ?? 0}</span>
          </div>
        </div>
        <Button variant="outline" size="sm" className="cursor-pointer">
          <Link href={`/post/${post.id}`}>Read post</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
