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
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import { EyeClosedIcon, EyeIcon } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
import Link from "next/link";

const signInSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

type signInSchema = z.infer<typeof signInSchema>;

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const loginGoogle = async () => {
    try {
      setLoading(true);
      await authClient.signIn.social({
        provider: "google",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const form = useForm<signInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: signInSchema) {
    try {
      setLoading(true);
      const { error } = await authClient.signIn.email({
        email: data.email,
        password: data.password,
        callbackURL: "/",
      });
      if (error) {
        toast.error(error.message);
      }
      toast.success("User logged in successfully");
      router.push("/");
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
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your details to login to your account
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
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="-mt-2" data-invalid={fieldState.invalid}>
                  <div className="flex items-center justify-between">
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <Link
                      href="/forgot-password"
                      className="text-xs text-muted-foreground hover:text-primary underline-offset-4 hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <InputGroup>
                    <InputGroupInput
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      type={showPassword ? "text" : "password"}
                      placeholder="********"
                    />
                    <InputGroupAddon
                      className="cursor-pointer"
                      align="inline-end"
                    >
                      <Button
                        variant={"ghost"}
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? (
                          <EyeClosedIcon className="size-4 text-muted-foreground" />
                        ) : (
                          <EyeIcon className="size-4 text-muted-foreground" />
                        )}
                      </Button>
                    </InputGroupAddon>
                  </InputGroup>
                </Field>
              )}
            />
            <div className="flex items-center gap-2 -mt-2">
              <Separator className="flex-1" />
              <span className="text-sm text-muted-foreground">
                or continue with
              </span>
              <Separator className="flex-1" />
            </div>
            <Field className="flex items-center gap-2 -mt-2">
              <Button
                onClick={() => {
                  loginGoogle();
                }}
                disabled={loading}
                variant={"outline"}
                className="w-full cursor-pointer"
              >
                <Image
                  className="size-4"
                  src="/google.png"
                  alt="Google"
                  width={20}
                  height={20}
                />
                Continue with google
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="mt-2">
        <Field>
          <Button className="cursor-pointer" form="form" disabled={loading}>
            {loading ? (
              <>
                <Spinner className="size-4" /> Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
