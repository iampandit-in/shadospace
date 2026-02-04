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
import { createPost } from "@/server/posts";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Tiptap from "@/components/tiptap/editor";

const formSchema = z.object({
  title: z.string().min(10, "Title must be at least 10 characters."),
  content: z.string().min(100, "Content must be at least 100 characters."),
});

export default function CreatePost() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      toast.loading("Creating post...");
      const response = await createPost(data.title, data.content);
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
    <div className="mt-8">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
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
                  className="bg-muted-20"
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
                    className="p-10 border border-t-0 border-input bg-muted/20 -mt-2 rounded-t-none"
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
          <Field orientation="horizontal">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
              Reset
            </Button>
            <Button type="submit" className="cursor-pointer" disabled={loading}>
              {loading ? "Loading..." : "Submit"}
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
