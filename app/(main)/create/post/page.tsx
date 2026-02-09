"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { createPost } from "@/server/posts";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { uploadImageClient } from "@/lib/upload";
import { X, ImagePlus } from "lucide-react";
import Tiptap from "@/components/tiptap/editor";
import Image from "next/image";

const formSchema = z.object({
  title: z.string().min(10, "Title must be at least 10 characters."),
  content: z.string().min(100, "Content must be at least 100 characters."),
});

export default function CreatePost() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
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
      toast.loading("Creating post...");

      let imageUrl = undefined;
      if (selectedFile) {
        imageUrl = await uploadImageClient(selectedFile, "posts");
      }

      const response = await createPost(data.title, data.content, imageUrl);
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
      form.reset();
    }
  }

  return (
    <div className="mt-2 md:mt-8 container">
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
                <FieldLabel className="uppercase">Post Title</FieldLabel>
                <Input
                  {...field}
                  aria-invalid={fieldState.invalid}
                  placeholder="This is an example post title"
                  autoComplete="off"
                  className="bg-muted-20 md:py-5 md:px-4"
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
                <FieldLabel className="uppercase">Post Content</FieldLabel>
                <div className="flex flex-col gap-2">
                  <Tiptap
                    className="md:p-10 p-5 border border-t-0 border-input bg-muted/20 -mt-2 rounded-t-none"
                    content={field.value}
                    onChange={field.onChange}
                  />
                  <div className="flex text-sm text-muted-foreground tabular-nums">
                    {field.value.replace(/<[^>]*>/g, "").length} characters
                  </div>
                </div>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Field orientation="horizontal" className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              className="cursor-pointer w-1/2"
              onClick={() => form.reset()}
            >
              Reset
            </Button>
            <Button
              type="submit"
              className="cursor-pointer w-1/2"
              disabled={loading}
            >
              {loading ? "Creating Post..." : "Create Post"}
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
