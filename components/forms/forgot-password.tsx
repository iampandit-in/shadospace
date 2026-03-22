"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { z } from "zod";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";

const forgotPasswordSchema = z.object({
  email: z.email("Invalid email address"),
});

type forgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<forgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: forgotPasswordSchema) {
    try {
      setLoading(true);
      const { error } = await authClient.requestPasswordReset({
        email: data.email,
        redirectTo: "/reset-password",
      });
      if (error) {
        toast.error(error.message);
        return;
      }
      toast.success("Email sent successfully");
      router.push("/reset-password");
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="max-w-sm w-full">
      <CardHeader>
        <CardTitle>Forgot your password?</CardTitle>
        <CardDescription>
          Don&apos;t worry, it happens to the best of us. Enter your email and
          we&apos;ll send you a reset link.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="-mt-2" data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={"form-email"}>Email</FieldLabel>
                  <Input
                    {...field}
                    id={"form-email"}
                    aria-invalid={fieldState.invalid}
                    placeholder="john@jujutsu.com"
                    autoComplete="on"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="mt-2">
        <Field>
          <Button
            type="submit"
            className="cursor-pointer"
            form="form"
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner className="size-4" /> Sending email...
              </>
            ) : (
              "Send email"
            )}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}

