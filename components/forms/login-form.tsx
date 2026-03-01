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
  FieldSeparator,
} from "@/components/ui/field";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import LoadingButton from "../utils/loading-button";
import { useState } from "react";
import { Input } from "../ui/input";
import * as z from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

export function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleSocialLogin = async (provider: "github" | "google") => {
    try {
      setLoading(true);
      await authClient.signIn.social({
        provider,
      });
      toast.success("Logged in successfully");
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
      toast.dismiss();
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      toast.loading("Logging in...");
      await authClient.signIn.email({
        email: data.email,
        password: data.password,
      });
      toast.success("Logged in successfully");
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
      toast.dismiss();
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Welcome back</CardTitle>
          <CardDescription>
            Login with your Github or Google account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <Field>
              <LoadingButton
                loading={loading}
                variant="outline"
                onClick={() => handleSocialLogin("github")}
              >
                <FaGithub />
                Github
              </LoadingButton>

              <LoadingButton
                loading={loading}
                variant="outline"
                onClick={() => handleSocialLogin("google")}
              >
                <FcGoogle />
                Google
              </LoadingButton>
            </Field>
          </FieldGroup>
          <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card my-2">
            Or continue with
          </FieldSeparator>
          <form id="login-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      {...field}
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
                    <div className="flex items-center">
                      <FieldLabel htmlFor="password">Password</FieldLabel>
                      <Link
                        href="/forgot-password"
                        className="ml-auto text-sm underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      {...field}
                      aria-invalid={fieldState.invalid}
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
            <LoadingButton loading={loading} form="login-form">
              Login
            </LoadingButton>
          </Field>
        </CardFooter>
      </Card>
      <FieldDescription className="text-center">
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="font-medium underline-offset-4 hover:underline"
        >
          Sign up
        </Link>
      </FieldDescription>
    </div>
  );
}
