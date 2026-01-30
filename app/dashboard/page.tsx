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
import { FileText, Eye, Edit3, Plus, MoreVertical } from "lucide-react";

export default function Page() {
  const stats = [
    {
      title: "Total Posts",
      value: "12",
      icon: FileText,
      description: "+2 from last month",
    },
    {
      title: "Total Views",
      value: "2.4k",
      icon: Eye,
      description: "+15% increase",
    },
    {
      title: "Drafts",
      value: "3",
      icon: Edit3,
      description: "Needs review",
    },
  ];

  const recentPosts = [
    {
      id: 1,
      title: "Getting Started with Next.js 15",
      date: "2024-01-20",
      status: "Published",
      views: "1.2k",
    },
    {
      id: 2,
      title: "The Future of Web Development",
      date: "2024-01-18",
      status: "Published",
      views: "850",
    },
    {
      id: 3,
      title: "Mastering Tailwind CSS Gradients",
      date: "2024-01-15",
      status: "Draft",
      views: "0",
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
                <BreadcrumbPage>Dashboard Overview</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <Button size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          <span>New Post</span>
        </Button>
      </header>

      <div className="flex flex-1 flex-col gap-6 p-6">
        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          {stats.map((stat) => (
            <Card key={stat.title} className="border-border/50 bg-muted/20">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Posts Section */}
        <Card className="border-border/50 bg-muted/20">
          <CardHeader>
            <CardTitle className="text-lg">Recent Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPosts.map((post) => (
                <div
                  key={post.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-muted/10 hover:bg-muted/30 transition-colors"
                >
                  <div className="flex flex-col gap-1">
                    <span className="font-medium text-sm md:text-base">
                      {post.title}
                    </span>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{post.date}</span>
                      <Separator orientation="vertical" className="h-3" />
                      <span
                        className={
                          post.status === "Published"
                            ? "text-green-500"
                            : "text-yellow-500"
                        }
                      >
                        {post.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="hidden md:flex flex-col items-end gap-1">
                      <span className="text-sm font-medium">{post.views}</span>
                      <span className="text-[10px] text-muted-foreground">
                        views
                      </span>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Button
              variant="link"
              className="mt-4 p-0 h-auto text-sm text-muted-foreground hover:text-primary"
            >
              View all posts
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
