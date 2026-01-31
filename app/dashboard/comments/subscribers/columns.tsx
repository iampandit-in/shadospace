"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export type Subscriber = {
  id: number;
  email: string;
  name: string;
  date: string;
  status: string;
};

export const columns: ColumnDef<Subscriber>[] = [
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <div className="flex items-center gap-2 font-medium">
        <Mail className="h-3 w-3 text-muted-foreground" />
        {row.getValue("email")}
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue("name")}</span>
    ),
  },
  {
    accessorKey: "date",
    header: "Joined Date",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium ${
            status === "Active"
              ? "bg-green-500/10 text-green-500"
              : "bg-muted text-muted-foreground"
          }`}
        >
          {status}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-right"></div>,
    cell: () => (
      <div className="text-right">
        <Button
          variant="ghost"
          size="sm"
          className="text-primary hover:underline bg-transparent p-0 h-auto font-medium"
        >
          View Profile
        </Button>
      </div>
    ),
  },
];
