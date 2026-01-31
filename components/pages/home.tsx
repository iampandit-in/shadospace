import { getPublicPosts, getPublicCategories } from "@/server/posts";
import { FeaturedPosts } from "../sections/featured-posts";
import { CategoryChips } from "../sections/category-chips";
import { SearchPosts } from "../sections/search-posts";
import { User } from "better-auth";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { HomeSidebar } from "../home-sidebar";
import { HomeRightSidebar } from "../home-right-sidebar";
import { Separator } from "../ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "../ui/breadcrumb";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface HomePageProps {
  user: User;
  searchParams: {
    category?: string;
    search?: string;
  };
}

export default async function HomePage({ user, searchParams }: HomePageProps) {
  const [posts, categories] = await Promise.all([
    getPublicPosts({
      categorySlug: searchParams.category,
      search: searchParams.search,
    }),
    getPublicCategories(),
  ]);

  return (
    <div className="">
      <header className="flex h-16 shrink-0 items-center justify-between px-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 border-b">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>Home</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex items-center gap-2">
          <SearchPosts />
          <Button variant="ghost" size="icon" className="rounded-full">
            <Avatar>
              <AvatarImage src={user.image || ""} alt="shadospace" />
              <AvatarFallback>
                {user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </Button>
        </div>
      </header>
      <div className="">
        <div className="">
          <div className="">
            <FeaturedPosts
              posts={posts}
              title={
                searchParams.search
                  ? `Search results for "${searchParams.search}"`
                  : searchParams.category
                    ? `${categories.find((c) => c.slug === searchParams.category)?.name || "Category"} Posts`
                    : "Recent Feed"
              }
              description={
                searchParams.search || searchParams.category
                  ? `Showing ${posts.length} results matching your filters.`
                  : "The latest insights from our world-class team."
              }
              showExploreAll={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
