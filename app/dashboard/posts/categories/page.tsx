"use client";

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
import { Plus, Trash2, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { getCategories, createCategory, deleteCategory } from "@/server/posts";
import { toast } from "sonner";
import { slugify } from "@/lib/utils";

import { DataTable } from "@/components/ui/data-table";
import { getColumns, Category } from "./columns";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const data = await getCategories();
      setCategories(data as Category[]);
    } catch {
      toast.error("Failed to load categories");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreate = async () => {
    if (!name) {
      toast.error("Name is required");
      return;
    }
    setIsCreating(true);
    try {
      await createCategory({ name, slug });
      toast.success("Category created");
      setName("");
      setSlug("");
      fetchCategories();
    } catch {
      toast.error("Failed to create category");
    } finally {
      setIsCreating(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    try {
      await deleteCategory(id);
      toast.success("Category deleted");
      fetchCategories();
    } catch {
      toast.error("Failed to delete category");
    }
  };

  const columns = getColumns({ onDelete: handleDelete });

  return (
    <>
      <header className="flex h-16 shrink-0 items-center justify-between px-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 border-b">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>Categories</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex flex-1 flex-col md:flex-row gap-6 p-6">
        {/* Add New Category */}
        <div className="w-full md:w-80 shrink-0">
          <Card className="border-border/50 bg-muted/20">
            <CardHeader>
              <CardTitle className="text-sm font-medium">
                Add New Category
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground uppercase font-medium">
                  Name
                </label>
                <Input
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (!slug || slug === slugify(name)) {
                      setSlug(slugify(e.target.value));
                    }
                  }}
                  placeholder="Category name..."
                  className="bg-muted/20 border-border/50"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground uppercase font-medium">
                  Slug
                </label>
                <Input
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="category-slug"
                  className="bg-muted/20 border-border/50"
                />
              </div>
              <Button
                onClick={handleCreate}
                disabled={isCreating}
                className="w-full gap-2 mt-2"
              >
                {isCreating ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Plus className="h-4 w-4" />
                )}
                Add Category
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Categories List */}
        <div className="flex-1">
          <Card className="border-border/50 bg-muted/20">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium">
                Existing Categories
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {isLoading ? (
                <div className="px-6 py-10 text-center">
                  <Loader2 className="h-6 w-6 animate-spin mx-auto text-muted-foreground" />
                </div>
              ) : (
                <DataTable columns={columns} data={categories} />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
