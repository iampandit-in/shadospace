"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { MoreVertical, Eye, Edit, Trash } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deletePost } from "@/server/posts";
import { toast } from "sonner";

export type Post = {
  id: string;
  title: string;
  slug: string;
  status: string;
  category: { name: string } | null;
  views: number;
  createdAt: Date;
};

export const getColumns = (refresh: () => void): ColumnDef<Post>[] => [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      const post = row.original;
      return (
        <div className="flex flex-col max-w-[300px] min-w-[200px]">
          <span className="font-medium whitespace-normal wrap-break-word underline-offset-4 hover:underline cursor-default">
            {post.title}
          </span>
          <span className="text-[10px] text-muted-foreground font-normal truncate">
            /{post.slug}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium ${
            status === "published"
              ? "bg-green-500/10 text-green-500"
              : "bg-yellow-500/10 text-yellow-500"
          }`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      );
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const category = row.original.category;
      return (
        <span className="truncate max-w-[120px] block">
          {category?.name || "Uncategorized"}
        </span>
      );
    },
  },
  {
    accessorKey: "views",
    header: "Views",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      return (
        <span className="whitespace-nowrap">
          {format(new Date(row.getValue("createdAt")), "MMM d, yyyy")}
        </span>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const post = row.original;

      const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this post?")) return;

        try {
          await deletePost(post.id);
          toast.success("Post deleted successfully");
          refresh();
        } catch (error) {
          toast.error("Failed to delete post");
          console.error(error);
        }
      };

      return (
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
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <Link href={`/dashboard/posts/${post.id}/edit`}>
                <DropdownMenuItem className="gap-2 cursor-pointer">
                  <Edit className="h-3.5 w-3.5" />
                  Edit Post
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem
                className="gap-2 text-destructive focus:text-destructive cursor-pointer"
                onClick={handleDelete}
              >
                <Trash className="h-3.5 w-3.5" />
                Delete Post
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
