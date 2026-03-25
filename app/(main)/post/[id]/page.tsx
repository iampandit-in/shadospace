import { getPostByIdAction, incrementViewAction } from "@/lib/actions/post";
import { notFound } from "next/navigation";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import RichTextRenderer from "@/components/editor/rich-text-renderer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, MessageSquare, Share2, ThumbsUp } from "lucide-react";

interface PostPageProps {
  params: Promise<{ id: string }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params;
  const post = await getPostByIdAction(id);
  if (!post) {
    notFound();
  }

  await incrementViewAction(id);

  return (
    <div className="max-w-3xl mx-auto mt-2 md:mt-10">
      <div className="mb-8">
        <Button
          variant="ghost"
          size="sm"
          className="-ml-2 mb-6 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        >
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="size-4" />
            <span>Back to feed</span>
          </Link>
        </Button>

        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-6">
          {post.title}
        </h1>

        <div className="flex items-center gap-3 mb-6">
          <Avatar className="size-8">
            {post.author.image && (
              <AvatarImage src={post.author.image} alt={post.author.name} />
            )}
            <AvatarFallback>
              {post.author.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm leading-none mb-0.5">{post.author.name}</p>
            <p className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(post.createdAt), {
                addSuffix: true,
              })}
            </p>
          </div>
        </div>
      </div>

      {post.coverImageUrl && (
        <div className="relative aspect-video w-full mb-10 overflow-hidden rounded-2xl shadow-xl border border-border">
          <Image
            src={post.coverImageUrl}
            alt={post.title}
            fill
            className="object-cover"
            priority
            unoptimized
          />
        </div>
      )}

      <div className="mb-12">
        <RichTextRenderer content={post.contentJson} />
      </div>

      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 cursor-pointer hover:text-primary"
            >
              <ThumbsUp className="size-5" />
              <span className="font-medium">{post.likeCount}</span>
            </Button>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MessageSquare className="size-5" />
            <span className="text-sm font-medium">Comments coming soon</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="cursor-pointer">
            <Share2 className="size-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
