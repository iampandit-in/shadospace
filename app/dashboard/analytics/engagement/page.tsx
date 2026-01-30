import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Share2, Heart, Award, TrendingUp } from "lucide-react";

export default function EngagementPage() {
  return (
    <>
      <header className="flex h-16 shrink-0 items-center justify-between px-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 border-b">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>User Engagement</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-6 p-6">
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-border/50 bg-muted/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Comments</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+128</div>
              <p className="text-xs text-muted-foreground mt-1">
                New comments this week
              </p>
            </CardContent>
          </Card>
          <Card className="border-border/50 bg-muted/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Post Likes</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+842</div>
              <p className="text-xs text-muted-foreground mt-1">
                Total reactions received
              </p>
            </CardContent>
          </Card>
          <Card className="border-border/50 bg-muted/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Shares</CardTitle>
              <Share2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+45</div>
              <p className="text-xs text-muted-foreground mt-1">
                Across social platforms
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-border/50 bg-muted/20">
          <CardHeader>
            <CardTitle className="text-lg">Most Engaging Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                {
                  title: "Next.js vs Remix: The 2024 Guide",
                  score: 98,
                  meta: "24 comments • 156 likes",
                },
                {
                  title: "Mastering CSS Grid in 10 Minutes",
                  score: 85,
                  meta: "12 comments • 89 likes",
                },
                {
                  title: "The Dark Side of AI Development",
                  score: 72,
                  meta: "45 comments • 210 likes",
                },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
                    #{i + 1}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {item.title}
                    </p>
                    <p className="text-xs text-muted-foreground">{item.meta}</p>
                  </div>
                  <div className="flex items-center gap-1 text-sm font-bold">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    {item.score}%
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
