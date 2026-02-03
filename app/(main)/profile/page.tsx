"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getPosts } from "@/server/posts";
import { DeletePostButton } from "@/components/posts/delete-post-button";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

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

export default function ProfilePage() {
  const [posts, setPosts] = useState<PostWithUser[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "date">("date");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPosts();
        if (response.success && response.posts) {
          setPosts(response.posts as unknown as PostWithUser[]);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const filteredAndSortedPosts = useMemo(() => {
    let result = [...posts];

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
  }, [posts, searchTerm, sortBy]);

  return (
    <div className="mt-4">
      <div className="flex items-center justify-end gap-2">
        <Input
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-xs"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Sort: {sortBy === "name" ? "Name" : "Date"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setSortBy("name")}>
              Sort by name
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy("date")}>
              Sort by date
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="outline" asChild>
          <Link href={"/create/post"}>Create Post</Link>
        </Button>
      </div>
      <Table className="mt-4 rounded-2xl">
        <TableHeader>
          <TableRow>
            <TableHead>Post Title</TableHead>
            <TableHead>Created by</TableHead>
            <TableHead>Created at</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-8">
                Loading posts...
              </TableCell>
            </TableRow>
          ) : filteredAndSortedPosts.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center py-8 text-muted-foreground"
              >
                No posts found.
              </TableCell>
            </TableRow>
          ) : (
            filteredAndSortedPosts.map((post) => (
              <TableRow key={post.post.id}>
                <TableCell>
                  <Link href={`/post/${post.post.id}`}>{post.post.title}</Link>
                </TableCell>
                <TableCell>{post.user.username}</TableCell>
                <TableCell>
                  {new Date(post.post.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center gap-2 justify-end">
                    <Button size={"icon"} variant={"ghost"} asChild>
                      <Link href={`/edit/post/${post.post.id}`}>
                        <Pencil className="w-4 h-4" />
                      </Link>
                    </Button>
                    <DeletePostButton postId={post.post.id} />
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
