"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  email: z.email("Invalid email address."),
});

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    await authClient.requestPasswordReset(
      {
        email: data.email,
        redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password`,
      },
      {
        onRequest: () => {
          setLoading(true);
        },
        onResponse: () => {
          setLoading(false);
        },
        onSuccess: () => {
          toast.success("please check your email");
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      },
    );
  }

  return (
    <div className="w-full sm:max-w-md mx-auto mt-20 flex flex-col gap-4">
      <div className="flex flex-col items-center justify-center mb-4 gap-2">
        <Image
          src={"/shadospace.png"}
          alt="shadospace"
          height={40}
          width={40}
        />
        <p className="text-lg font-medium">forgot your password?</p>
      </div>
      <form id="form-rhf-input" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="-mt-4">
                <FieldLabel htmlFor="form-rhf-input-email">email</FieldLabel>
                <Input
                  {...field}
                  id="form-rhf-input-email"
                  aria-invalid={fieldState.invalid}
                  placeholder="shadcn@example.com"
                  autoComplete="email"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </form>
      <div className="flex flex-col gap-4">
        <Button
          className="w-full cursor-pointer"
          type="submit"
          form="form-rhf-input"
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              <p>sending email...</p>
            </div>
          ) : (
            "send email"
          )}
        </Button>
      </div>
      <Link className="text-center mt-4" href="/signup">
        Don&apos;t have an account?{" "}
        <span className="text-red-400 hover:underline">sign up</span>
      </Link>
    </div>
  );
}
