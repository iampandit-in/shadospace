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
  const [postData, setPostData] = useState<PostWithUser[]>([]);
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

  return (
    <div>
      <main className="mt-6 ">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-7 w-full mb-1" />
                  <Skeleton className="h-7 w-5/6" />
                </CardHeader>
                <CardFooter className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-9 w-9 rounded-full" />
                    <div className="flex flex-col gap-1">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                  </div>
                  <Skeleton className="h-8 w-8 rounded-md" />
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : postData.length === 0 ? (
          <div className="text-center py-24 bg-card/30 rounded-3xl border border-dashed border-white/10">
            <Filter className="mx-auto h-12 w-12 text-muted-foreground/30 mb-4" />
            <h3 className="text-xl font-semibold mb-2">No posts found</h3>
            <p className="text-muted-foreground max-w-xs mx-auto mb-8">
              We couldn&apos;t find any posts matching your criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {postData.map((post) => (
              <Link
                href={`/post/${post.post.id}`}
                key={post.post.id}
                className="group"
              >
                <Card>
                  <CardHeader>
                    <CardTitle>{post.post.title}</CardTitle>
                  </CardHeader>
                  <CardFooter className="text-muted-foreground flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-9 w-9">
                        <AvatarImage
                          src={
                            post.user.image || "https://github.com/shadcn.png"
                          }
                        />
                        <AvatarFallback className="bg-primary/10 text-primary uppercase text-xs">
                          {post.user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-xs font-medium">
                          {post.user.username}
                        </span>
                        <div className="flex items-center text-[10px] text-muted-foreground uppercase tracking-wider">
                          {new Date(post.post.createdAt).toLocaleDateString(
                            "en-IN",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            },
                          )}
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost">
                      <ArrowRight />
                    </Button>
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
