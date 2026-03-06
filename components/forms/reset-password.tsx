"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "../ui/input";
import { useForm, Controller } from "react-hook-form";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { toast } from "sonner";
import { resetPassword } from "@/server/users";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import LoadingButton from "../utils/loading-button";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { InputGroup, InputGroupAddon } from "../ui/input-group";
import { EyeIcon, EyeClosedIcon } from "@phosphor-icons/react";
import { Button } from "../ui/button";

const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be atleast 8 characters long"),
    confirmPassword: z
      .string()
      .min(8, "Password must be atleast 8 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: ResetPasswordFormValues) => {
    const token = searchParams.get("token");
    if (!token) {
      toast.error("Invalid or missing token");
      return;
    }
    const toadId = toast.loading("Updating password...");
    try {
      setLoading(true);
      const response = await resetPassword(token, data.password);
      if (response.success) {
        toast.success(response.message, {
          id: toadId,
        });
        router.push("/dashboard");
      } else {
        toast.error(response.message, {
          id: toadId,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Internal server error", {
        id: toadId,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome back</CardTitle>
        <CardDescription>Enter enter your new password</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="reset-password-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
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
                        variant={"ghost"}
                        type="button"
                        className="cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeIcon /> : <EyeClosedIcon />}
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
                        variant={"ghost"}
                        type="button"
                        className="cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeIcon /> : <EyeClosedIcon />}
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
          <LoadingButton loading={loading} form="reset-password-form">
            Reset Password
          </LoadingButton>
        </Field>
      </CardFooter>
    </Card>
  );
}
