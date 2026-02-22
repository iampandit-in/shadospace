"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

const settingsSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(20, "Username must be at most 20 characters long")
    .regex(
      /^[a-z0-9_]+$/,
      "Username can only contain lowercase letters, numbers, and underscores",
    ),
  image: z
    .string()
    .url("Must be a valid URL")
    .optional()
    .or(z.literal(""))
    .nullable(),
});

type SettingsValues = z.infer<typeof settingsSchema>;

interface SettingsFormProps {
  user: {
    id: string;
    name: string;
    email: string;
    username?: string | null;
    image?: string | null;
  };
}

export function SettingsForm({ user }: SettingsFormProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<SettingsValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      name: user.name || "",
      username: user.username || "",
      image: user.image || "",
    },
  });

  const onSubmit = async (data: SettingsValues) => {
    try {
      setLoading(true);
      // We are treating empty string as un-setting the image in the form
      const imageValue = data.image === "" ? undefined : data.image;

      const { error } = await authClient.updateUser({
        name: data.name,
        username: data.username,
        image: imageValue,
      });

      if (error) {
        toast.error(error.message || "Failed to update profile");
      } else {
        toast.success("Profile updated successfully");
        router.refresh();
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onPasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const currentPassword = formData.get("currentPassword") as string;
    const newPassword = formData.get("newPassword") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill in all password fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }
    if (newPassword.length < 8) {
      toast.error("New password must be at least 8 characters long.");
      return;
    }

    try {
      setLoading(true);
      const { error } = await authClient.changePassword({
        newPassword,
        currentPassword,
        revokeOtherSessions: true,
      });

      if (error) {
        toast.error(error.message || "Failed to change password");
      } else {
        toast.success("Password changed successfully.");
        // clear the form by resetting the html form target
        (e.target as HTMLFormElement).reset();
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="name">Display Name</FieldLabel>
                  <Input
                    {...field}
                    id="name"
                    disabled={loading}
                    aria-invalid={fieldState.invalid}
                    placeholder="Your Name"
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
                    placeholder="username"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="image"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="image">Profile Picture URL</FieldLabel>
                  <Input
                    {...field}
                    value={field.value || ""}
                    id="image"
                    disabled={loading}
                    aria-invalid={fieldState.invalid}
                    placeholder="https://example.com/avatar.png"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Field>
              <Button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto"
              >
                {loading ? "Saving changes..." : "Save Changes"}
              </Button>
            </Field>
          </FieldGroup>
        </div>
      </form>

      <form onSubmit={onPasswordSubmit} className="space-y-6">
        <div className="pt-6 border-t">
          <h2 className="text-xl font-semibold mb-4">Change Password</h2>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="currentPassword">
                Current Password
              </FieldLabel>
              <Input
                id="currentPassword"
                name="currentPassword"
                type="password"
                disabled={loading}
                placeholder="********"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="newPassword">New Password</FieldLabel>
              <Input
                id="newPassword"
                name="newPassword"
                type="password"
                disabled={loading}
                placeholder="********"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="confirmPassword">
                Confirm New Password
              </FieldLabel>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                disabled={loading}
                placeholder="********"
              />
            </Field>

            <Field>
              <Button
                type="submit"
                disabled={loading}
                variant="secondary"
                className="w-full sm:w-auto mt-2"
              >
                {loading ? "Approving..." : "Update Password"}
              </Button>
            </Field>
          </FieldGroup>
        </div>
      </form>
    </div>
  );
}
