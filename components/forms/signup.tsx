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
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Spinner } from "../ui/spinner";

const signUpSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    email: z.email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z
      .string()
      .min(8, "Confirm password must be at least 8 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignUpSchema = z.infer<typeof signUpSchema>;

export default function SignUpForm() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
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

  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: SignUpSchema) {
    try {
      setLoading(true);
      const { error } = await authClient.signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
        callbackURL: "/",
      });
      if (error) {
        toast.error(error.message);
        return;
      }
      toast.success(
        "Account created! Please check your email to verify your account.",
      );
      router.push("/signin");
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
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your details to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={"form-name"}>Name</FieldLabel>
                  <Input
                    {...field}
                    id={"form-name"}
                    aria-invalid={fieldState.invalid}
                    placeholder="John Jujutsu"
                    autoComplete="on"
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
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>
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
                        type="button"
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
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />
            <Controller
              name="confirmPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="-mt-2" data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Confirm Password</FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="********"
                    />
                    <InputGroupAddon
                      className="cursor-pointer"
                      align="inline-end"
                    >
                      <Button
                        type="button"
                        variant={"ghost"}
                        onClick={toggleConfirmPasswordVisibility}
                      >
                        {showConfirmPassword ? (
                          <EyeClosedIcon className="size-4 text-muted-foreground" />
                        ) : (
                          <EyeIcon className="size-4 text-muted-foreground" />
                        )}
                      </Button>
                    </InputGroupAddon>
                  </InputGroup>
                  <FieldError errors={[fieldState.error]} />
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
                type="button"
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
          <Button className="cursor-pointer" disabled={loading} form="form">
            {loading ? (
              <>
                <Spinner />
                Creating account...
              </>
            ) : (
              <>Create account</>
            )}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
