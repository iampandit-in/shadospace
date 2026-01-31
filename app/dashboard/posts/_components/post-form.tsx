"use client";

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
import { useState, useRef } from "react";
import { createPost, updatePost } from "@/server/posts";
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
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

interface PostFormProps {
  initialData?: {
    id: string;
    title: string;
    content: string;
    categoryId: string | null;
    status: "draft" | "published";
    image: string | null;
  };
  categories: { id: string; name: string }[];
}

export function PostForm({ initialData, categories }: PostFormProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [categoryId, setCategoryId] = useState<string>(
    initialData?.categoryId || "",
  );
  const [status, setStatus] = useState<"draft" | "published">(
    initialData?.status || "draft",
  );
  const [coverImage, setCoverImage] = useState(initialData?.image || "");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const response = await fetch(
        `/api/upload?filename=${encodeURIComponent(file.name)}`,
        {
          method: "POST",
          body: file,
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || "Upload failed");
      }

      const blob = await response.json();
      setCoverImage(blob.url);
      toast.success("Cover image uploaded!");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to upload image",
      );
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (finalStatus: "draft" | "published") => {
    if (!title) {
      toast.error("Please enter a title");
      return;
    }
    if (!content || content === "<p></p>") {
      toast.error("Please add some content");
      return;
    }

    setIsSaving(true);
    try {
      const data = {
        title,
        content,
        status: finalStatus,
        categoryId: categoryId || undefined,
        image: coverImage || undefined,
      };

      if (initialData) {
        await updatePost(initialData.id, data);
        toast.success(
          finalStatus === "published"
            ? "Post updated and published!"
            : "Draft updated!",
        );
      } else {
        await createPost(data);
        toast.success(
          finalStatus === "published" ? "Post published!" : "Draft saved!",
        );
      }

      router.push("/dashboard/posts");
      router.refresh();
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("Failed to save post");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-1 flex-col lg:flex-row gap-6 p-6 max-w-7xl mx-auto w-full">
      {/* Dynamic Header actions (absolute or passed via another way, but let's keep it here for simplicity) */}
      <div className="lg:hidden flex justify-end gap-2 mb-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleSubmit("draft")}
          disabled={isSaving}
          className="cursor-pointer"
        >
          <Save className="h-4 w-4 mr-2" />
          Save Draft
        </Button>
        <Button
          size="sm"
          onClick={() => handleSubmit("published")}
          disabled={isSaving}
          className="cursor-pointer"
        >
          <Send className="h-4 w-4 mr-2" />
          Publish
        </Button>
      </div>

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
            className="px-4 py-6 mt-4 md:text-2xl font-semibold"
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
        <div className="space-y-4 p-4 rounded-xl border border-border/50 bg-muted/20 backdrop-blur-sm sticky top-6">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-primary">
            <Settings className="h-4 w-4" />
            Post Settings
          </h3>

          <Separator className="bg-border/50" />

          {/* Actions in Sidebar for Desktop */}
          <div className="hidden lg:flex flex-col gap-2">
            <Button
              variant="outline"
              className="w-full justify-start cursor-pointer gap-2 border-border/50 bg-muted/20"
              onClick={() => handleSubmit("draft")}
              disabled={isSaving}
            >
              <Save className="h-4 w-4" />
              Save Draft
            </Button>
            <Button
              className="w-full justify-start cursor-pointer gap-2"
              onClick={() => handleSubmit("published")}
              disabled={isSaving}
            >
              {isSaving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              {isSaving
                ? "Saving..."
                : initialData
                  ? "Update & Publish"
                  : "Publish Now"}
            </Button>
          </div>

          <Separator className="bg-border/50 hidden lg:block" />

          {/* Category selection */}
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground uppercase">
              Category
            </Label>
            <Select value={categoryId} onValueChange={setCategoryId}>
              <SelectTrigger className="bg-muted/30 border-border/50 cursor-pointer w-full">
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

          {/* Status toggle */}
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
      </div>
    </div>
  );
}
