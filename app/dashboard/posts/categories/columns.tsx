"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  postCount?: number | unknown;
};

interface ColumnProps {
  onDelete: (id: string) => void;
}

export const getColumns = ({
  onDelete,
}: ColumnProps): ColumnDef<Category>[] => [
  {
    accessorKey: "name",
    header: "Category",
    cell: ({ row }) => {
      const category = row.original;
      return (
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-primary" />
          <span className="font-medium">{category.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "slug",
    header: "Slug",
    cell: ({ row }) => (
      <span className="text-muted-foreground">{row.getValue("slug")}</span>
    ),
  },
  {
    accessorKey: "postCount",
    header: "Posts Count",
    cell: ({ row }) => {
      const count = row.getValue("postCount") as number;
      return <span>{count || 0} posts</span>;
    },
  },
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => {
      const category = row.original;
      return (
        <div className="flex items-center justify-end gap-2">
          <Button
            onClick={() => onDelete(category.id)}
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:text-destructive text-muted-foreground"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];
