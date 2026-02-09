"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { editPost, getPostById } from "@/server/posts";
import { toast } from "sonner";
import { useRouter, useParams } from "next/navigation";
import { uploadImageClient } from "@/lib/upload";
import { X, ImagePlus } from "lucide-react";
import Tiptap from "@/components/tiptap/editor";
import Image from "next/image";
const formSchema = z.object({
  title: z.string().min(10, "Title must be at least 10 characters."),
  content: z.string().min(100, "Content must be at least 100 characters."),
});

export default function EditPost() {
  const { id } = useParams();
  const postId = id as string;
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [isFetching, setIsFetching] = React.useState(true);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  React.useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await getPostById(postId);
        if (
          response.success &&
          response.singlePost &&
          response.singlePost.length > 0
        ) {
          const postData = response.singlePost[0].post;
          form.reset({
            title: postData.title,
            content: postData.content,
          });
          if (postData.image) {
            setImagePreview(postData.image);
          }
        } else {
          toast.error("Post not found");
          router.push("/profile");
        }
      } catch (error) {
        toast.error("Failed to fetch post");
        console.error(error);
      } finally {
        setIsFetching(false);
      }
    };
    fetchPost();
  }, [postId, form, router]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = async () => {
    setImagePreview(null);
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      toast.loading("Updating post...");

      let imageUrl = imagePreview || undefined;
      if (selectedFile) {
        imageUrl = await uploadImageClient(selectedFile, "posts");
      }

      const response = await editPost(
        data.title,
        data.content,
        postId,
        imageUrl,
      );
      if (response.success === true) {
        toast.dismiss();
        toast.success(response.message);
        router.push("/profile");
      } else {
        toast.dismiss();
        toast.error(response.message);
      }
    } catch (error) {
      const e = error as Error;
      toast.dismiss();
      toast.error("Something went wrong", {
        description: e.message,
      });
    } finally {
      setLoading(false);
    }
  }

  if (isFetching) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="mt-8 container">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Field>
            <FieldLabel className="uppercase">Cover Image</FieldLabel>
            <div className="flex flex-col gap-4">
              {imagePreview ? (
                <div className="relative h-56 w-full overflow-hidden rounded-lg border bg-muted">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    fill
                    unoptimized
                    className="object-cover"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute right-2 top-2 h-8 w-8 rounded-full"
                    onClick={handleRemoveImage}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="flex h-56 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/50 transition-colors hover:bg-muted/80"
                >
                  <ImagePlus className="mb-2 h-10 w-10 text-muted-foreground/50" />
                  <p className="text-sm text-muted-foreground">
                    Click to upload cover image
                  </p>
                </div>
              )}
              <Input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
          </Field>
          <Controller
            name="title"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Post Title</FieldLabel>
                <Input
                  {...field}
                  aria-invalid={fieldState.invalid}
                  placeholder="This is an example post title"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="content"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Content</FieldLabel>
                <div className="flex flex-col gap-2">
                  <Tiptap
                    className="border border-input p-10 -mt-2 rounded-t-none border-t-0"
                    content={field.value}
                    onChange={field.onChange}
                  />
                  <div className="flex justify-start text-sm text-muted-foreground tabular-nums">
                    {field.value.length} characters
                  </div>
                </div>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Field orientation="horizontal">
            <Button
              className="cursor-pointer w-1/2"
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
              Reset
            </Button>
            <Button
              className="cursor-pointer w-1/2"
              type="submit"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update"}
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
