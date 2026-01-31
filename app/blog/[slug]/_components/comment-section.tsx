"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { addComment } from "@/server/posts";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { MessageSquare, Send, Loader2 } from "lucide-react";

interface Comment {
  id: string;
  content: string;
  createdAt: Date;
  author: {
    name: string;
    image?: string | null;
  };
}

interface Session {
  user: {
    id: string;
    name: string;
    image?: string | null;
    email: string;
    username?: string | null;
  };
  session: {
    id: string;
    expiresAt: Date;
    token: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    ipAddress?: string | null;
    userAgent?: string | null;
  };
}

interface CommentSectionProps {
  postId: string;
  comments: Comment[];
  userSession: Session | null;
}

export function CommentSection({
  postId,
  comments,
  userSession,
}: CommentSectionProps) {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!userSession) {
      toast.error("Please sign in to comment");
      return;
    }

    if (!content.trim()) return;

    setIsSubmitting(true);
    try {
      await addComment({ postId, content });
      setContent("");
      toast.success("Comment added!");
      router.refresh(); // Refresh to get new comments
    } catch (error) {
      toast.error("Failed to add comment" + error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight">Discussion</h2>
            <p className="text-sm text-muted-foreground font-medium">
              {comments.length} {comments.length === 1 ? "comment" : "comments"}
            </p>
          </div>
        </div>
      </div>

      {/* Comment Form */}
      {userSession ? (
        <div className="relative rounded-xl">
          <div className="flex gap-6">
            <Avatar className="h-12 w-12 border-2 border-background ring-1 ring-border/50">
              <AvatarImage src={userSession.user.image || undefined} />
              <AvatarFallback className="bg-primary/5 text-primary font-bold">
                {userSession.user.name[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <Textarea
                placeholder="Share your thoughts on this story..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[120px] p-4 text-lg bg-accent/10"
              />
              <div className="flex items-center justify-between pt-4 border-t border-border/10">
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting || !content.trim()}
                  className="rounded-md"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Posting...</span>
                    </div>
                  ) : (
                    <>
                      Post Comment
                      <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-4xl border border-dashed border-border/50 p-16 text-center space-y-6 bg-muted/5 backdrop-blur-sm relative overflow-hidden group">
          <div className="absolute inset-0 bg-linear-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative space-y-4">
            <div className="mx-auto w-12 h-12 rounded-2xl bg-muted flex items-center justify-center mb-6">
              <MessageSquare className="h-6 w-6 text-muted-foreground/50" />
            </div>
            <h3 className="text-xl font-bold">Join the discussion</h3>
            <p className="text-muted-foreground max-w-sm mx-auto">
              Sign in to share your thoughts and connect with other readers.
            </p>
            <Button
              variant="outline"
              className="rounded-full px-10 border-primary/20 hover:bg-primary/5 hover:text-primary transition-all"
              onClick={() => router.push("/sign-in")}
            >
              Sign In to Comment
            </Button>
          </div>
        </div>
      )}

      {/* Comment List */}
      <div className="space-y-10 pt-6">
        {comments.map((comment) => (
          <div key={comment.id} className="group relative flex gap-6">
            <Avatar className="h-12 w-12 border-2 border-background ring-1 ring-border/50 shrink-0 shadow-sm">
              <AvatarImage src={comment.author.image || undefined} />
              <AvatarFallback className="bg-muted text-muted-foreground font-bold">
                {comment.author.name[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-medium text-base">
                    {comment.author.name}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-border" />
                  <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
                    {format(new Date(comment.createdAt), "MMM d, yyyy")}
                  </span>
                </div>
              </div>
              <div className="hover:bg-muted/30 p-4 rounded-lg bg-accent/10">
                {comment.content}
              </div>
            </div>
          </div>
        ))}
        {comments.length === 0 && (
          <div className="text-center py-24 bg-muted/5 rounded-4xl border border-dashed border-border/50">
            <div className="flex justify-center mb-6">
              <div className="p-5 rounded-3xl bg-muted/50 border border-border/50">
                <MessageSquare className="h-10 w-10 text-muted-foreground/30" />
              </div>
            </div>
            <h3 className="text-lg font-bold text-muted-foreground">
              No discussions yet
            </h3>
            <p className="text-sm text-muted-foreground/60 mt-1">
              Be the first to share your thoughts!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
