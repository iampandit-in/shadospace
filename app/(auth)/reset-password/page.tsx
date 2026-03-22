import ResetPassword from "@/components/forms/reset-password";
import Image from "next/image";
import Link from "next/link";

export default function ResetPasswordPage() {
  return (
    <div className="flex flex-col items-center h-[calc(100vh-4rem)] justify-center gap-6">
      <Link href={"/"} className="flex items-center gap-2">
        <Image src={"/logo.png"} alt="shadospace logo" height={25} width={25} />
        <h1 className="text-lg font-medium">Shadospace</h1>
      </Link>
      <ResetPassword />
      <div className="flex items-center gap-2">
        <p className="text-sm text-muted-foreground">
          Remembered your password?{" "}
          <Link href={"/signin"} className="underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
