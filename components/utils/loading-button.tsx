import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";
import Image from "next/image";

type LoadingFormButtonProps = {
  className?: string;
  variant?:
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
  icon?: React.ReactNode;
  image?: string;
  loading?: boolean;
  disabled?: boolean;
  loadingText?: string;
  text?: string;
  children?: React.ReactNode;
};

export default function LoadingButton({
  className,
  variant,
  size,
  icon,
  image,
  loading,
  disabled,
  loadingText,
  text,
  children,
}: LoadingFormButtonProps) {
  const { pending } = useFormStatus();
  const isLoading = loading ?? pending;
  const isDisabled = disabled || isLoading;

  return (
    <Button
      disabled={isDisabled}
      className={className}
      variant={variant}
      size={size}
    >
      {image && (
        <Image src={image} alt="" width={20} height={20} loading="lazy" />
      )}
      {isLoading ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : icon}
      {isLoading && loadingText ? loadingText : children || text}
    </Button>
  );
}
