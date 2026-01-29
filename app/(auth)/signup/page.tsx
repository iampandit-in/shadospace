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
import { InputGroup } from "@/components/ui/input-group";
import { useState, useRef, useTransition } from "react";
import { uploadAvatar } from "@/server/upload";
import Image from "next/image";
import { Camera, Loader2, UserCircle, X } from "lucide-react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

import { SocialAuthButtons } from "@/components/utils/social-auth-buttons";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters.")
    .max(10, "Name must be at most 10 characters.")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Name can only contain letters, numbers, and underscores.",
    ),
  email: z.email("Invalid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
  image: z.string().optional(),
});

export default function SignUp() {
  const router = useRouter();
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, startTransition] = useTransition();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      image: "",
    },
  });

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void,
  ) => {
    const file = e.target.files?.[0];

    if (file) {
      // 1. Create a local preview URL immediately
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);

      // 2. Start the background upload
      startTransition(async () => {
        try {
          const formData = new FormData();
          formData.append("file", file);

          const url = await uploadAvatar(formData);

          // 3. Update the form with the REAL Vercel Blob URL
          fieldChange(url);
          toast.success("Image uploaded!", {
            description: "Image uploaded successfully!",
          });
        } catch (error) {
          console.error(error);
          toast.error("Failed to upload image.", {
            description: `Please try again. ${error}`,
          });
          setPreview(null); // Revert preview on failure
        }
      });
    }
  };

  // 2. Handle Image Removal
  const handleRemoveImage = (e: React.MouseEvent) => {
    // Stop propagation prevents triggering the parent div's click (which opens file dialog)
    e.stopPropagation();

    setPreview(null); // Clear local preview
    form.setValue("image", ""); // Clear form state

    // Reset file input so the same file can be selected again if needed
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    toast.info("Image removed");
  };

  async function onSubmit(data: z.infer<typeof formSchema>) {
    await authClient.signUp.email(
      {
        email: data.email,
        password: data.password,
        name: data.name,
        image: data.image,
        callbackURL: "/",
      },
      {
        onRequest: () => {
          setLoading(true);
        },
        onResponse: () => {
          setLoading(false);
        },
        onSuccess: () => {
          toast.success("Sign up successfully", {
            description: "Please check your email for verification.",
          });
          router.push("/");
          router.refresh();
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      },
    );
  }

  return (
    <div className="w-full sm:max-w-md mx-auto flex flex-col gap-4">
      <div className="flex flex-col items-center justify-center gap-2">
        <Image
          src={"/shadospace.png"}
          alt="shadospace"
          height={40}
          width={40}
        />
        <p className="text-lg font-medium">create your account</p>
      </div>
      <form id="form-rhf-input" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="image"
            control={form.control}
            // Destructure 'ref' out so we don't pass it to the input spread
            render={({
              field: { onChange, ref, value, ...fieldProps },
              fieldState,
            }) => (
              <div className="flex items-center gap-4 my-2">
                {/* Main Clickable Container */}
                <div
                  onClick={() => {
                    // Only trigger click if not uploading and no preview exists yet
                    if (!isUploading) fileInputRef.current?.click();
                  }}
                  className={`relative group overflow-hidden w-18 h-18 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 transition-colors
                       ${!preview && !isUploading ? "cursor-pointer hover:border-red-500" : ""} 
                    `}
                >
                  {preview ? (
                    <Image
                      height={100}
                      width={100}
                      src={preview}
                      alt="Preview"
                      className={`w-full h-full object-cover ${isUploading ? "opacity-50" : ""}`}
                    />
                  ) : (
                    <UserCircle className="w-16 h-16 text-gray-300" />
                  )}

                  {/* State 1: Hover Overlay - Camera (Only if NO image selected yet) */}
                  {!preview && !isUploading && (
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity pointer-events-none">
                      <Camera className="text-white w-6 h-6" />
                    </div>
                  )}

                  {/* State 2: Hover Overlay - Remove Button (Only if image EXISTS and not uploading) */}
                  {preview && !isUploading && (
                    // 3. The Remove Button
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200 z-10"
                    >
                      <div className="bg-red-500/80 p-2 rounded-full text-white hover:bg-red-600 transition">
                        <X className="w-5 h-5" />
                      </div>
                    </button>
                  )}

                  {/* Loading Spinner */}
                  {isUploading && (
                    <div className="absolute inset-0 flex items-center justify-center z-20">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>

                {/* Helper text based on state */}
                <p className="text-xs text-muted-foreground text-center h-4">
                  {isUploading
                    ? "Uploading..."
                    : preview
                      ? "Hover to remove"
                      : "Click to upload"}
                </p>

                <input
                  {...fieldProps}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFileChange(e, onChange)}
                  // Merge Refs
                  ref={(e) => {
                    ref(e);
                    fileInputRef.current = e;
                  }}
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </div>
            )}
          />
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="-mt-4">
                <FieldLabel htmlFor="form-rhf-input-name">name</FieldLabel>
                <Input
                  {...field}
                  id="form-rhf-input-name"
                  aria-invalid={fieldState.invalid}
                  placeholder="John Doe"
                  autoComplete="name"
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
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="-mt-4">
                <FieldLabel htmlFor="form-rhf-input-password">
                  password
                </FieldLabel>
                <InputGroup>
                  <Input
                    {...field}
                    id="form-rhf-input-password"
                    placeholder="********"
                    aria-invalid={fieldState.invalid}
                  />
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
              creating your account...
            </div>
          ) : (
            "Sign Up"
          )}
        </Button>
        <SocialAuthButtons />
      </div>

      <Link className="text-center mt-4" href="/signin">
        already have an account?{" "}
        <span className="text-red-400 hover:underline">sign in</span>
      </Link>
    </div>
  );
}
