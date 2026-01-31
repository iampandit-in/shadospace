import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { Eye, Clock, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface Post {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  image: string | null;
  views: number;
  createdAt: Date;
  category: {
    name: string;
    slug: string;
  } | null;
  author: {
    name: string;
    image: string | null;
  };
}

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col h-full bg-card/30 border border-border/50 rounded-md"
    >
      {/* Image Container */}
      <div className="relative aspect-video overflow-hidden">
        {post.image ? (
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover rounded-md"
          />
        ) : (
          <div className="w-full h-full bg-accent/5 flex items-center justify-center transition-colors group-hover:bg-accent/10">
            <span className="text-primary/20 font-bold text-4xl">S</span>
          </div>
        )}
        <div className="absolute inset-0 bg-linear-to-t from-background/90 via-transparent to-transparent opacity-60" />
        {post.category && (
          <Badge className="absolute top-4 left-4 bg-background/80 backdrop-blur-md text-foreground border-border/50 hover:bg-background">
            {post.category.name}
          </Badge>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-4">
          <Avatar className="h-6 w-6 ring-1 ring-border/50">
            <AvatarImage src={post.author.image || undefined} />
            <AvatarFallback className="text-[10px]">
              {post.author.name[0]}
            </AvatarFallback>
          </Avatar>
          <span className="text-xs font-medium text-muted-foreground">
            {post.author.name}
          </span>
          <span className="text-[4px] text-muted-foreground/50">●</span>
          <span className="text-xs text-muted-foreground">
            {format(new Date(post.createdAt), "MMM d, yyyy")}
          </span>
        </div>

        <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
          {post.title}
        </h3>

        <p className="text-muted-foreground text-sm line-clamp-2 mb-6 flex-1">
          {post.description || "Read more about this article on Shadospace."}
        </p>

        <div className="flex items-center justify-between pt-6 border-t border-border/50">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Eye className="w-3 h-3" />
              {post.views}
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />5 min read
            </div>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            Read <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}
