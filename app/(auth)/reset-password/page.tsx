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
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import Image from "next/image";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

const formSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters."),
    confirmPassword: z
      .string()
      .min(8, "Confirm Password must be at least 8 characters."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

function ResetPasswordForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  async function onSubmit(data: z.infer<typeof formSchema>) {
    await authClient.resetPassword(
      {
        newPassword: data.password,
        token: token ?? "",
      },
      {
        onRequest: () => {
          setLoading(true);
        },
        onResponse: () => {
          setLoading(false);
        },
        onSuccess: () => {
          toast.success("password reset successfully");
          router.push("/signin");
        },
        onError: (ctx: any) => {
          toast.error(ctx.error.message);
        },
      },
    );
  }

  return (
    <div className="w-full sm:max-w-md mx-auto flex flex-col gap-4 mt-20">
      <div className="flex flex-col items-center justify-center gap-2">
        <Image
          src={"/shadospace.png"}
          alt="shadospace"
          height={40}
          width={40}
        />
        <p className="text-lg font-medium">reset your password</p>
      </div>
      <form id="form-rhf-input" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="-mt-4">
                <FieldLabel htmlFor="form-rhf-input-password">
                  password
                </FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    {...field}
                    id="form-rhf-input-password"
                    placeholder="********"
                    type={showPassword ? "text" : "password"}
                    aria-invalid={fieldState.invalid}
                  />
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton
                      size="icon-xs"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </InputGroupButton>
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
              <Field data-invalid={fieldState.invalid} className="-mt-4">
                <FieldLabel htmlFor="form-rhf-input-confirm-password">
                  confirm password
                </FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    {...field}
                    id="form-rhf-input-confirm-password"
                    placeholder="********"
                    type={showConfirmPassword ? "text" : "password"}
                    aria-invalid={fieldState.invalid}
                  />
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton
                      size="icon-xs"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      aria-label={
                        showConfirmPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showConfirmPassword ? <EyeOff /> : <Eye />}
                    </InputGroupButton>
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

      <div className="flex flex-col gap-4">
        <Button
          className="w-full cursor-pointer"
          type="submit"
          form="form-rhf-input"
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              resetting password...
            </div>
          ) : (
            "Reset Password"
          )}
        </Button>
      </div>
    </div>
  );
}

export default function ResetPassword() {
  return (
    <Suspense
      fallback={
        <div className="w-full sm:max-w-md mx-auto flex flex-col items-center justify-center gap-4 mt-20">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}
