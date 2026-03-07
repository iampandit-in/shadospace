"use client";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { SpinnerIcon } from "@phosphor-icons/react";
import { useFormStatus } from "react-dom";

export default function LoadingButton({
  onClick,
  variant = "default",
  children,
  loadingText,
  className,
  loading,
  form,
  ...props
}: {
  variant?:
    | "default"
    | "secondary"
    | "outline"
    | "destructive"
    | "ghost"
    | "link";
  children: React.ReactNode;
  loadingText?: string;
  className?: string;
  loading?: boolean;
  form?: string;
  props?: React.ComponentProps<typeof Button>;
  onClick?: () => void;
}) {
  const { pending } = useFormStatus();
  return (
    <Button
      onClick={onClick}
      type="submit"
      variant={variant}
      className={cn(className, "cursor-pointer")}
      disabled={pending || loading}
      form={form}
      {...props}
    >
      {(pending || loading) && <SpinnerIcon className="animate-spin" />}
      {pending || loading ? loadingText : children}
    </Button>
  );
}
