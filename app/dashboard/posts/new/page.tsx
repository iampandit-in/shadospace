"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  Save,
  Send,
  Loader2,
  Settings,
  Image as ImageIcon,
  Upload,
  X,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { TiptapEditor } from "@/components/editor/tiptap-editor";
import { useState, useEffect, useRef } from "react";
import { createPost, getCategories } from "@/server/posts";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import Image from "next/image";

export default function NewPostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [coverImage, setCoverImage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>(
    [],
  );
  const [isPublishing, setIsPublishing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getCategories().then((data) =>
      setCategories(data as { id: string; name: string }[]),
    );
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const response = await fetch(`/api/upload?filename=${file.name}`, {
        method: "POST",
        body: file,
      });

      if (!response.ok) throw new Error("Upload failed");

      const blob = await response.json();
      setCoverImage(blob.url);
      toast.success("Cover image uploaded!");
    } catch {
      toast.error("Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  const handlePublish = async (finalStatus: "draft" | "published") => {
    if (!title) {
      toast.error("Please enter a title");
      return;
    }
    if (!content || content === "<p></p>") {
      toast.error("Please add some content");
      return;
    }

    setIsPublishing(true);
    try {
      await createPost({
        title,
        content,
        status: finalStatus,
        categoryId: categoryId || undefined,
        image: coverImage || undefined,
      });
      toast.success(
        finalStatus === "published" ? "Post published!" : "Draft saved!",
      );
      router.push("/dashboard/posts");
      router.refresh();
    } catch (error) {
      console.error("Publish error:", error);
      toast.error("Failed to save post");
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <>
      <header className="flex h-16 shrink-0 items-center justify-between px-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 border-b">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>New Post</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-2 border-border/50 bg-muted/20"
            onClick={() => handlePublish("draft")}
            disabled={isPublishing}
          >
            <Save className="h-4 w-4" />
            <span className="hidden md:inline">Save Draft</span>
          </Button>
          <Button
            size="sm"
            className="gap-2"
            onClick={() => handlePublish("published")}
            disabled={isPublishing}
          >
            {isPublishing ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            <span>{isPublishing ? "Publishing..." : "Publish"}</span>
          </Button>
        </div>
      </header>

      <div className="flex flex-1 flex-col lg:flex-row gap-6 p-6 max-w-7xl mx-auto w-full">
        {/* Main Editor Section */}
        <div className="flex-1 space-y-6">
          {/* Cover Image Preview on Top */}
          {coverImage && (
            <div className="relative w-full rounded-2xl overflow-hidden aspect-21/9 border border-border/50 group">
              <Image
                src={coverImage}
                alt="Cover"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  className="gap-2"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-4 w-4" />
                  Change
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  className="gap-2"
                  onClick={() => setCoverImage("")}
                >
                  <X className="h-4 w-4" />
                  Remove
                </Button>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Post Title
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title..."
              className="text-2xl md:text-5xl font-bold h-auto py-4 bg-transparent border-none focus-visible:ring-0 px-0 placeholder:text-muted-foreground/30"
            />
          </div>

          <TiptapEditor
            content={content}
            onChange={setContent}
            placeholder="Start writing your story..."
          />
        </div>

        {/* Sidebar Settings Section */}
        <div className="w-full lg:w-80 space-y-6">
          <div className="space-y-4 p-4 rounded-xl border border-border/50 bg-muted/20 backdrop-blur-sm">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-primary">
              <Settings className="h-4 w-4" />
              Post Settings
            </h3>

            <Separator className="bg-border/50" />

            {/* Category selection */}
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground uppercase">
                Category
              </Label>
              <Select value={categoryId} onValueChange={setCategoryId}>
                <SelectTrigger className="bg-muted/30 border-border/50">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Status toggle (Simplified - using buttons in header but can show current selected here) */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-xs text-muted-foreground uppercase">
                  Publish Instantly
                </Label>
                <p className="text-[10px] text-muted-foreground">
                  Will be visible to all readers
                </p>
              </div>
              <Switch
                checked={status === "published"}
                onCheckedChange={(checked) =>
                  setStatus(checked ? "published" : "draft")
                }
              />
            </div>

            <Separator className="bg-border/50" />

            {/* Cover Image Upload/URL */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-xs text-muted-foreground uppercase">
                  Cover Image
                </Label>
                <ImageIcon className="h-3 w-3 text-muted-foreground" />
              </div>

              {!coverImage && (
                <Button
                  variant="outline"
                  className="w-full py-8 border-dashed border-border group/upload bg-muted/30 hover:bg-muted/50 gap-2 flex-col h-auto"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                  ) : (
                    <>
                      <Upload className="h-6 w-6 text-muted-foreground group-hover/upload:text-primary transition-colors" />
                      <span className="text-xs">Upload from device</span>
                    </>
                  )}
                </Button>
              )}

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleUpload}
                className="hidden"
                accept="image/*"
              />

              <div className="space-y-1">
                <Label className="text-[10px] text-muted-foreground uppercase px-1">
                  Or image URL
                </Label>
                <Input
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  placeholder="https://..."
                  className="bg-muted/30 border-border/50 text-xs h-8"
                />
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-border/50 bg-muted/10">
            <p className="text-[10px] text-muted-foreground leading-relaxed">
              * Drafts are only visible to you. Once published, your post will
              be live on your blog feed.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
