"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { X, Link as LinkIcon, Upload, Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { uploadImageAction } from "@/lib/actions/post";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import RichTextEditor from "@/components/editor/rich-text-editor";
import { authClient } from "@/lib/auth-client";
import { type JSONContent } from "@tiptap/react";
import { useMutation } from "@tanstack/react-query";
import { createPostAction } from "@/lib/actions/post";

// --- Schema Definitions ---

const createPostSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long").max(300),
  contentJson: z.custom<JSONContent>(
    (val) =>
      !!val && typeof val === "object" && Object.keys(val as object).length > 0,
    "Content cannot be empty",
  ),
  communityId: z.string().optional(),
  coverImageUrl: z.url("Invalid image URL").optional().or(z.literal("")),
});

type CreatePostValues = z.infer<typeof createPostSchema>;

export default function CreatePostPage() {
  const router = useRouter();
  const session = authClient.useSession();

  const form = useForm<CreatePostValues>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: "",
      contentJson: { type: "doc", content: [] },
      communityId: "",
      coverImageUrl: "",
    },
  });

  const uploadImage = useMutation({
    mutationFn: uploadImageAction,
    onSuccess: (res) => {
      form.setValue("coverImageUrl", res.url);
      toast.success("Image uploaded successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Upload failed");
    },
  });

  const createPost = useMutation({
    mutationFn: createPostAction,
    onSuccess: () => {
      toast.success("Post created successfully!");
      router.push("/");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create post");
    },
  });

  useEffect(() => {
    if (!session.isPending && !session.data) {
      toast.error("Please login to create a post");
      router.push("/signin");
    }
  }, [session, router]);

  const onSubmit = async (data: CreatePostValues) => {
    createPost.mutate({
      title: data.title,
      contentJson: data.contentJson,
      communityId: data.communityId || undefined,
      coverImageUrl: data.coverImageUrl || undefined,
    });
  };

  if (session.isPending) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="my-8">
        <h1 className="text-2xl font-bold">Create a Post</h1>
        <p className="text-muted-foreground">
          Share your thoughts, stories, or ideas with the Shadospace community.
        </p>
      </div>
      <div>
        <form
          id="create-post-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <FieldGroup>
            <Controller
              name="coverImageUrl"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="text-sm font-medium mb-2">
                    Cover Image
                  </FieldLabel>
                  <div className="space-y-2">
                    {field.value ? (
                      <div className="relative h-60 w-full">
                        <Image
                          src={field.value}
                          alt="Cover preview"
                          fill
                          className="object-cover rounded-md"
                          unoptimized
                        />
                        <div className="absolute top-2 right-2">
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon-xs"
                            className="rounded-full"
                            onClick={() => field.onChange("")}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <Tabs defaultValue="upload" className="w-full">
                        <TabsList className="mb-4">
                          <TabsTrigger value="upload" className="gap-2">
                            <Upload className="h-4 w-4" />
                            Upload
                          </TabsTrigger>
                          <TabsTrigger value="url" className="gap-2">
                            <LinkIcon className="h-4 w-4" />
                            URL
                          </TabsTrigger>
                        </TabsList>
                        <TabsContent value="upload" className="mt-0">
                          <label className="flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/20 bg-muted/30 hover:bg-muted/50 transition-colors h-[200px] rounded-lg cursor-pointer group">
                            {uploadImage.isPending ? (
                              <div className="flex flex-col items-center gap-2">
                                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                                <span className="text-sm font-medium">
                                  Uploading...
                                </span>
                              </div>
                            ) : (
                              <div className="flex flex-col items-center gap-2">
                                <Upload className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" />
                                <div className="flex flex-col items-center">
                                  <span className="text-sm font-medium text-muted-foreground">
                                    Click to upload or drag and drop
                                  </span>
                                  <span className="text-xs text-muted-foreground/64">
                                    Max 4MB
                                  </span>
                                </div>
                              </div>
                            )}
                            <input
                              type="file"
                              className="hidden"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  if (file.size > 4 * 1024 * 1024) {
                                    toast.error(
                                      "Image size must be less than 4MB",
                                    );
                                    return;
                                  }
                                  const formData = new FormData();
                                  formData.append("file", file);
                                  uploadImage.mutate(formData);
                                }
                              }}
                              disabled={uploadImage.isPending}
                            />
                          </label>
                        </TabsContent>
                        <TabsContent value="url" className="mt-0">
                          <div className="flex flex-col gap-3 p-8 border-2 border-dashed border-muted-foreground/20 rounded-lg bg-muted/30">
                            <div className="flex flex-col items-center gap-2 text-center">
                              <LinkIcon className="h-8 w-8 text-muted-foreground opacity-50" />
                              <span className="text-sm font-medium text-muted-foreground">
                                Enter an image URL
                              </span>
                            </div>
                            <Input
                              className="bg-background"
                              placeholder="https://images.unsplash.com/..."
                              {...field}
                            />
                          </div>
                        </TabsContent>
                      </Tabs>
                    )}
                  </div>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Title Input */}
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="sr-only">Title</FieldLabel>
                  <Input {...field} placeholder="Title" />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="contentJson"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <RichTextEditor
                    value={field.value as JSONContent}
                    onChange={field.onChange}
                    placeholder="Write your post content here..."
                    className="min-h-[400px]"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </div>
      <div className="flex justify-end pt-6 px-0">
        <div className="flex gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={createPost.isPending}
            className="px-8"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="create-post-form"
            disabled={createPost.isPending}
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-8"
          >
            {createPost.isPending ? (
              <>
                <Spinner className="mr-2 h-4 w-4" /> Creating...
              </>
            ) : (
              "Post"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
