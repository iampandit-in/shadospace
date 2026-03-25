"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import {
  LinkIcon,
  UploadIcon,
  ArrowLeftIcon,
  XIcon,
  SpinnerIcon,
} from "@phosphor-icons/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  uploadImageAction,
  createPostAction,
  updatePostAction,
  getPostByIdAction,
} from "@/lib/actions/post";

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
import { useMutation, useQuery } from "@tanstack/react-query";
import Link from "next/link";

// --- Schema Definitions ---

const createPostSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long").max(300),
  contentJson: z.custom<JSONContent>(
    (val) =>
      !!val && typeof val === "object" && Object.keys(val as object).length > 0,
    "Content cannot be empty",
  ),
  coverImageUrl: z.url("Invalid image URL").optional().or(z.literal("")),
});

type CreatePostValues = z.infer<typeof createPostSchema>;

function PostEditor() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");
  const isEditing = !!editId;

  const session = authClient.useSession();

  const form = useForm<CreatePostValues>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: "",
      contentJson: { type: "doc", content: [] },
      coverImageUrl: "",
    },
  });

  const { data: existingPost, isLoading: isLoadingPost } = useQuery({
    queryKey: ["post", editId],
    queryFn: () => getPostByIdAction(editId!),
    enabled: isEditing,
  });

  useEffect(() => {
    if (existingPost) {
      if (
        !session.isPending &&
        session.data?.user?.id !== existingPost.authorId
      ) {
        toast.error("You are not authorized to edit this post");
        router.push("/");
        return;
      }

      form.reset({
        title: existingPost.title,
        contentJson: existingPost.contentJson,
        coverImageUrl: existingPost.coverImageUrl || "",
      });
    }
  }, [existingPost, form, session.data?.user?.id, session.isPending, router]);

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

  const savePost = useMutation({
    mutationFn: async (values: CreatePostValues) => {
      if (isEditing && editId) {
        return updatePostAction({
          id: editId,
          title: values.title,
          contentJson: values.contentJson,
          coverImageUrl: values.coverImageUrl || undefined,
        });
      } else {
        return createPostAction({
          title: values.title,
          contentJson: values.contentJson,
          coverImageUrl: values.coverImageUrl || undefined,
        });
      }
    },
    onSuccess: (res) => {
      toast.success(isEditing ? "Post updated!" : "Post created!");
      router.push(`/post/${res.id}`);
    },
    onError: (error) => {
      toast.error(
        error.message || `Failed to ${isEditing ? "update" : "create"} post`,
      );
    },
  });

  useEffect(() => {
    if (!session.isPending && !session.data) {
      toast.error(`Please login to ${isEditing ? "edit" : "create"} a post`);
      router.push("/signin");
    }
  }, [session, router, isEditing]);

  const onSubmit = (data: CreatePostValues) => {
    savePost.mutate(data);
  };

  if (session.isPending || (isEditing && isLoadingPost)) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Spinner className="h-8 w-8 text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="my-8">
        <h1 className="text-2xl font-bold">
          {isEditing ? "Edit Post" : "Create a Post"}
        </h1>
        <p className="text-muted-foreground">
          {isEditing
            ? "Refine your thoughts and update your story."
            : "Share your thoughts, stories, or ideas with the community."}
        </p>
      </div>

      <form
        id="post-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
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
                <div className="space-y-4">
                  {field.value ? (
                    <div className="relative group overflow-hidden rounded-md ring-offset-background transition-all hover:ring-2 hover:ring-primary/20">
                      <div className="relative aspect-video w-full">
                        <Image
                          src={field.value}
                          alt="Cover preview"
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          unoptimized
                        />
                      </div>
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon-xs"
                          className="rounded-full shadow-lg"
                          onClick={() => field.onChange("")}
                        >
                          <XIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Tabs defaultValue="upload" className="w-full">
                      <TabsList className="mb-4 bg-muted/50 p-1">
                        <TabsTrigger
                          value="upload"
                          className="gap-2 data-active:bg-background data-active:shadow-sm"
                        >
                          <UploadIcon className="h-4 w-4" />
                          Upload
                        </TabsTrigger>
                        <TabsTrigger
                          value="url"
                          className="gap-2 data-active:bg-background data-active:shadow-sm"
                        >
                          <LinkIcon className="h-4 w-4" />
                          URL
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent
                        value="upload"
                        className="mt-0 outline-hidden"
                      >
                        <label className="flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/20 bg-muted/20 hover:bg-muted/30 hover:border-primary/30 transition-all h-[200px] rounded-xl cursor-pointer group">
                          {uploadImage.isPending ? (
                            <div className="flex flex-col items-center gap-3">
                              <SpinnerIcon className="h-8 w-8 animate-spin text-primary" />
                              <span className="text-sm font-medium animate-pulse">
                                Uploading to cloud...
                              </span>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center gap-3 text-center px-4">
                              <div className="p-3 rounded-full bg-background ring-1 ring-border group-hover:ring-primary/30 group-hover:text-primary transition-all shadow-sm">
                                <UploadIcon className="h-6 w-6" />
                              </div>
                              <div className="flex flex-col gap-1">
                                <span className="text-sm font-medium">
                                  Click to upload or drag and drop
                                </span>
                                <span className="text-xs text-muted-foreground/60">
                                  SVG, PNG, JPG or GIF (max. 4MB)
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
                      <TabsContent value="url" className="mt-0 outline-hidden">
                        <div className="flex flex-col gap-4 p-8 border-2 border-dashed border-muted-foreground/20 rounded-xl bg-muted/20">
                          <div className="flex flex-col items-center gap-2 text-center">
                            <div className="p-3 rounded-full bg-background ring-1 ring-border shadow-sm">
                              <LinkIcon className="h-6 w-6 text-muted-foreground" />
                            </div>
                            <span className="text-sm font-medium text-muted-foreground">
                              Enter a direct image URL
                            </span>
                          </div>
                          <Input
                            className="bg-background shadow-xs focus-visible:ring-primary/20"
                            placeholder="https://images.unsplash.com/photo-..."
                            {...field}
                          />
                        </div>
                      </TabsContent>
                    </Tabs>
                  )}
                </div>
                {fieldState.invalid && (
                  <FieldError className="mt-2" errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="title"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="sr-only">Title</FieldLabel>
                <Input
                  {...field}
                  placeholder="Post Title"
                  className="text-xl md:text-2xl font-bold h-auto py-3 px-4 border-none shadow-none focus-visible:ring-0 placeholder:text-muted-foreground/40"
                />
                {fieldState.invalid && (
                  <FieldError className="px-4" errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="contentJson"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <div className="rounded-xl border border-border bg-card shadow-xs overflow-hidden focus-within:ring-2 focus-within:ring-primary/10 transition-all">
                  <RichTextEditor
                    value={field.value as JSONContent}
                    onChange={field.onChange}
                    placeholder="Tell your story..."
                    className="min-h-[500px]"
                  />
                </div>
                {fieldState.invalid && (
                  <FieldError className="mt-2" errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </form>

      <div className="flex items-center justify-between mt-10 pt-6">
        <p className="text-xs text-muted-foreground">
          {isEditing
            ? "Original post date will be preserved."
            : "Your post will be public immediately after publishing."}
        </p>
        <div className="flex gap-3">
          <Button
            type="button"
            variant="ghost"
            onClick={() => router.back()}
            disabled={savePost.isPending}
            className="cursor-pointer"
          >
            Discard
          </Button>
          <Button
            type="submit"
            form="post-form"
            disabled={savePost.isPending || uploadImage.isPending}
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 rounded-full font-medium transition-all shadow-md hover:shadow-lg active:scale-95 disabled:active:scale-100"
          >
            {savePost.isPending ? (
              <>
                <SpinnerIcon className="mr-2 h-4 w-4 animate-spin" />
                {isEditing ? "Updating..." : "Publishing..."}
              </>
            ) : isEditing ? (
              "Update Changes"
            ) : (
              "Publish Post"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function CreateOrEditPostPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-[80vh] items-center justify-center">
          <Spinner className="h-8 w-8 text-primary" />
        </div>
      }
    >
      <PostEditor />
    </Suspense>
  );
}
