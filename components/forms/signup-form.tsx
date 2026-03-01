"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

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
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon } from "@/components/ui/input-group";
import { Eye, EyeClosed } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";
import LoadingButton from "../utils/loading-button";

const formSchema = z
  .object({
    image: z.string("Please provide an image"),
    name: z
      .string()
      .min(5, "Name must be at least 5 characters.")
      .max(32, "Name must be at most 32 characters."),
    email: z.email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters."),
    confirmPassword: z
      .string()
      .min(8, "Confirm Password must be at least 8 characters."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export function SignupForm() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      image: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      await authClient.signUp.email(
        {
          email: data.email,
          password: data.password,
          name: data.name,
        },
        {
          onRequest: () => {
            setLoading(true);
            toast.loading("Creating account...");
          },
          onSuccess: () => {
            setLoading(false);
            toast.success("Account created successfully");
            router.push("/dashboard");
          },
          onError: (ctx) => {
            setLoading(false);
            toast.error(ctx.error.message);
          },
        },
      );
    } catch (error) {
      console.log(error);
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
      toast.dismiss();
    }
  }

  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card className="w-full sm:max-w-md">
        <CardHeader>
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>
            Enter your details below to create your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="signup-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="signup-name">Name</FieldLabel>
                    <Input
                      placeholder="John Doe"
                      {...field}
                      id="signup-name"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="signup-email">Email</FieldLabel>
                    <Input
                      type="email"
                      placeholder="m@example.com"
                      {...field}
                      id="signup-email"
                      aria-invalid={fieldState.invalid}
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
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="signup-password">Password</FieldLabel>
                    <InputGroup>
                      <Input
                        className="relative"
                        type={showPassword ? "text" : "password"}
                        {...field}
                        id="signup-password"
                        placeholder="Enter your password"
                        aria-invalid={fieldState.invalid}
                      />
                      <InputGroupAddon
                        align={"inline-end"}
                        className="absolute right-0"
                      >
                        <Button
                          type="button"
                          variant="ghost"
                          className="cursor-pointer"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <Eye /> : <EyeClosed />}
                        </Button>
                      </InputGroupAddon>
                    </InputGroup>
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
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="signup-confirm-password">
                      Confirm Password
                    </FieldLabel>
                    <InputGroup>
                      <Input
                        className="relative"
                        type={showPassword ? "text" : "password"}
                        {...field}
                        id="signup-confirm-password"
                        placeholder="Confirm your password"
                        aria-invalid={fieldState.invalid}
                      />
                      <InputGroupAddon
                        align={"inline-end"}
                        className="absolute right-0"
                      >
                        <Button
                          type="button"
                          variant="ghost"
                          className="cursor-pointer"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <Eye /> : <EyeClosed />}
                        </Button>
                      </InputGroupAddon>
                    </InputGroup>
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
            <LoadingButton
              loading={loading}
              form="signup-form"
              className="w-full"
            >
              Create account
            </LoadingButton>
          </Field>
        </CardFooter>
      </Card>
      <FieldDescription className="text-center">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium underline-offset-4 hover:underline"
        >
          Login
        </Link>
      </FieldDescription>
    </div>
  );
}
