import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Plus,
  MoreVertical,
  Filter,
  Search,
  Eye,
  Edit,
  Trash,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { getPosts } from "@/server/posts";
import { format } from "date-fns";
import Link from "next/link";

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <>
      <header className="flex h-16 shrink-0 items-center justify-between px-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 border-b">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>All Posts</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <Link href="/dashboard/posts/new">
          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            <span>New Post</span>
          </Button>
        </Link>
      </header>

      <div className="flex flex-1 flex-col gap-6 p-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search posts..."
              className="pl-10 bg-muted/20 border-border/50"
            />
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 border-border/50 bg-muted/20"
            >
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-border/50 bg-muted/20"
            >
              Latest
            </Button>
          </div>
        </div>

        <Card className="border-border/50 bg-muted/20">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-muted-foreground uppercase border-b border-border/50">
                  <tr>
                    <th className="px-6 py-4 font-medium">Title</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                    <th className="px-6 py-4 font-medium">Category</th>
                    <th className="px-6 py-4 font-medium">Views</th>
                    <th className="px-6 py-4 font-medium">Date</th>
                    <th className="px-6 py-4 font-medium"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {posts.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-6 py-10 text-center text-muted-foreground"
                      >
                        No posts found. Create your first post!
                      </td>
                    </tr>
                  ) : (
                    posts.map((post) => (
                      <tr
                        key={post.id}
                        className="hover:bg-muted/30 transition-colors group"
                      >
                        <td className="px-6 py-4 font-medium">
                          <div className="flex flex-col">
                            <span>{post.title}</span>
                            <span className="text-[10px] text-muted-foreground font-normal">
                              /{post.slug}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium ${
                              post.status === "published"
                                ? "bg-green-500/10 text-green-500"
                                : "bg-yellow-500/10 text-yellow-500"
                            }`}
                          >
                            {post.status.charAt(0).toUpperCase() +
                              post.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {post.category?.name || "Uncategorized"}
                        </td>
                        <td className="px-6 py-4">{post.views}</td>
                        <td className="px-6 py-4">
                          {format(new Date(post.createdAt), "MMM d, yyyy")}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            {post.status === "published" && (
                              <Link href={`/blog/${post.slug}`} target="_blank">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-muted-foreground hover:text-primary"
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </Link>
                            )}
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                >
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-40">
                                <DropdownMenuItem className="gap-2">
                                  <Edit className="h-3.5 w-3.5" />
                                  Edit Post
                                </DropdownMenuItem>
                                <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive">
                                  <Trash className="h-3.5 w-3.5" />
                                  Delete Post
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
