"use client";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";
import { useFormStatus } from "react-dom";

export default function LoadingButton({
  onClick,
  variant = "default",
  children,
  className,
  loading,
  form,
  ...props
}: {
  variant?: "default" | "secondary" | "outline" | "ghost" | "link";
  children: React.ReactNode;
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
      {pending || (loading && <Loader className="mr-2 h-4 w-4 animate-spin" />)}
      {children}
    </Button>
  );
}
