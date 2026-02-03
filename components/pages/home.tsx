"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useMemo, useState } from "react";
import { getPosts } from "@/server/posts";
import Link from "next/link";
import {
  Search,
  Calendar,
  User,
  ArrowRight,
  Filter,
  SortAsc,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Post {
  id: string;
  image: string | null;
  title: string;
  content: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
  username: string | null;
  displayUsername: string | null;
}

interface PostWithUser {
  post: Post;
  user: User;
}

export default function HomePage() {
  const [postData, setPostData] = useState<PostWithUser[] | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "date">("date");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPosts();
        if (response.success && response.posts) {
          setPostData(response.posts as unknown as PostWithUser[]);
        } else {
          setPostData([]);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
        setPostData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const filteredAndSortedPosts = useMemo(() => {
    if (!postData) return [];
    let result = [...postData];

    // Search filter
    if (searchTerm) {
      result = result.filter((p) =>
        p.post.title.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Sort logic
    if (sortBy === "name") {
      result.sort((a, b) => a.post.title.localeCompare(b.post.title));
    } else {
      result.sort(
        (a, b) =>
          new Date(b.post.createdAt).getTime() -
          new Date(a.post.createdAt).getTime(),
      );
    }

    return result;
  }, [postData, searchTerm, sortBy]);

  return (
    <div className="min-h-screen bg-background">
      <main className="mt-10">
        {/* Controls Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="relative w-full md:max-w-md">
            <Input
              placeholder="Search posts by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className=""
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="">
                  <SortAsc className="h-4 w-4" />
                  Sort: {sortBy === "name" ? "A-Z" : "Latest First"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 rounded-xl p-2">
                <DropdownMenuItem
                  onClick={() => setSortBy("date")}
                  className="rounded-lg cursor-pointer"
                >
                  Latest First
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setSortBy("name")}
                  className="rounded-lg cursor-pointer"
                >
                  Name (A-Z)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Posts Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card
                key={i}
                className="overflow-hidden border-white/5 bg-card/50 flex flex-col h-[400px]"
              >
                <Skeleton className="h-48 w-full" />
                <CardHeader className="gap-2">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </CardHeader>
                <div className="mt-auto p-6 flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </Card>
            ))}
          </div>
        ) : filteredAndSortedPosts.length === 0 ? (
          <div className="text-center py-24 bg-card/30 rounded-3xl border border-dashed border-white/10">
            <Filter className="mx-auto h-12 w-12 text-muted-foreground/30 mb-4" />
            <h3 className="text-xl font-semibold mb-2">No posts found</h3>
            <p className="text-muted-foreground max-w-xs mx-auto mb-8">
              We couldn&apos;t find any posts matching your criteria. Try
              adjusting your search or filters.
            </p>
            <Button variant="outline" onClick={() => setSearchTerm("")}>
              Clear Search
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAndSortedPosts.map((post) => (
              <Link
                href={`/post/${post.post.id}`}
                key={post.post.id}
                className="group"
              >
                <Card className="h-full flex flex-col overflow-hidden border-white/5 bg-card/50 hover:bg-card hover:border-primary/20 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1">
                  <div className="relative h-48 w-full overflow-hidden bg-muted">
                    {post.post.image ? (
                      <Image
                        src={post.post.image}
                        alt={post.post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20">
                        <span className="text-4xl font-bold text-white/10 uppercase">
                          {post.post.title.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                  <CardHeader>
                    <CardTitle className="line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                      {post.post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">
                      {post.post.content}
                    </p>
                  </CardContent>
                  <CardFooter className="pt-0 p-6 flex items-center justify-between border-t border-white/5">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9 border border-white/10">
                        <AvatarImage src={post.user.image || ""} />
                        <AvatarFallback className="bg-primary/10 text-primary uppercase text-xs">
                          {post.user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">
                          {post.user.name}
                        </span>
                        <div className="flex items-center text-[10px] text-muted-foreground uppercase tracking-wider">
                          <Calendar className="mr-1 h-3 w-3" />
                          {new Date(post.post.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                            },
                          )}
                        </div>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
