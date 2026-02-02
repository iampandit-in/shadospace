"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

const schema = z
  .object({
    name: z.string().min(3, "Min 3 characters long"),
    username: z.string().min(3, "Min 3 characters long"),
    email: z.email("Please enter a valid email address"),
    password: z.string().min(8, "Min 8 characters long"),
    confirmPassword: z.string().min(8, "Min 8 characters long"),
    image: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export function SignupForm() {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      image: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    try {
      setLoading(true);
      const { error } = await authClient.signUp.email({
        name: data.name,
        username: data.username,
        email: data.email,
        password: data.password,
        image: data.image,
        callbackURL: "/",
      });
      if (error) {
        toast.error(error.message);
        setLoading(false);
      } else {
        toast.success("Account created successfully");
        setLoading(false);
      }
    } catch (error) {
      toast.error("Something went wrong" + error);
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field className="grid grid-cols-2 gap-4">
                <Controller
                  name="name"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="name">Name</FieldLabel>
                      <Input
                        {...field}
                        id="name"
                        disabled={loading}
                        aria-invalid={fieldState.invalid}
                        placeholder="Pandit"
                        autoComplete="off"
                        className="-mt-1"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="username"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="username">Username</FieldLabel>
                      <Input
                        {...field}
                        id="username"
                        disabled={loading}
                        aria-invalid={fieldState.invalid}
                        placeholder="@iampandit"
                        autoComplete="off"
                        className="-mt-1"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </Field>
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className="-mt-3" data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      {...field}
                      id="email"
                      type="email"
                      disabled={loading}
                      aria-invalid={fieldState.invalid}
                      placeholder="m@example.com"
                      autoComplete="off"
                      className="-mt-1"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className="-mt-3" data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                      {...field}
                      id="password"
                      type="password"
                      disabled={loading}
                      aria-invalid={fieldState.invalid}
                      placeholder="********"
                      autoComplete="off"
                      className="-mt-1"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="confirmPassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className="-mt-3" data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="confirmPassword">
                      Confirm Password
                    </FieldLabel>
                    <Input
                      {...field}
                      id="confirmPassword"
                      type="password"
                      disabled={loading}
                      aria-invalid={fieldState.invalid}
                      placeholder="********"
                      autoComplete="off"
                      className="-mt-1"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Field>
                <Button
                  className="w-full cursor-pointer"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Creating account..." : "Create Account"}
                </Button>
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or continue with
              </FieldSeparator>
              <Field>
                <Button variant="outline" type="button" disabled={loading}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Login with Google
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="text-center">
        Already have an account? <Link href="signin">Sign in</Link>
      </FieldDescription>
    </div>
  );
}
