"use client";

import { LoginForm } from "@/components/forms/login-form";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 self-center font-medium text-lg"
        >
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <Image
              src={"/logo.png"}
              height={30}
              width={30}
              alt="shadospace-logo"
            />
          </div>
          Shadospace
        </Link>
        <LoginForm />
      </div>
    </div>
  );
}
