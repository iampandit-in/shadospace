import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X, MessageCircle, User } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function ModerationPage() {
  const comments = [
    {
      id: 1,
      user: "John Doe",
      email: "john@example.com",
      post: "Getting Started with Next.js 15",
      content:
        "Great guide! Really helped me understand the new server component structure.",
      date: "2 hours ago",
    },
    {
      id: 2,
      user: "Sarah Smith",
      email: "sarah@gmail.com",
      post: "Mastering Tailwind CSS",
      content: "Can you explain how to use container queries with Tailwind?",
      date: "5 hours ago",
    },
    {
      id: 3,
      user: "Spam Bot",
      email: "bot@spam.com",
      post: "Future of AI",
      content: "Visit my website for cheap prizes and crypto advice!",
      date: "1 day ago",
    },
  ];

  return (
    <>
      <header className="flex h-16 shrink-0 items-center justify-between px-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 border-b">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>Moderation</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-6 p-6">
        <Card className="border-border/50 bg-muted/20">
          <CardHeader>
            <CardTitle className="text-lg">Recent Comments</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border/50">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="p-6 hover:bg-muted/10 transition-colors"
                >
                  <div className="flex gap-4">
                    <Avatar className="h-10 w-10 border border-border/50">
                      <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                        {comment.user
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm">
                            {comment.user}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            •
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {comment.date}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 gap-2 border-green-500/50 text-green-500 hover:bg-green-500/10"
                          >
                            <Check className="h-3.5 w-3.5" />
                            <span>Approve</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 gap-2 border-destructive/50 text-destructive hover:bg-destructive/10"
                          >
                            <X className="h-3.5 w-3.5" />
                            <span>Reject</span>
                          </Button>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground pb-2 italic">
                        on{" "}
                        <span className="font-medium text-primary">
                          {comment.post}
                        </span>
                      </p>
                      <p className="text-sm border-l-2 border-primary/20 pl-4 py-1 text-muted-foreground/80">
                        {comment.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
