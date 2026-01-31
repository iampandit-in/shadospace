"use client";

import { DataTable } from "@/components/ui/data-table";
import { getColumns, Post } from "../columns";
import { useRouter } from "next/navigation";

interface PostsTableProps {
  data: Post[];
}

export function PostsTable({ data }: PostsTableProps) {
  const router = useRouter();
  const columns = getColumns(() => router.refresh());

  return <DataTable columns={columns} data={data} />;
}
