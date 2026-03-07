"use client";

import { SignupForm } from "@/components/forms/signup-form";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function SignupPage() {
  const { data: session } = authClient.useSession();
  if (session) {
    redirect("/dashboard");
  }
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 self-center font-medium text-lg"
        >
          <Image
            src={"/logo.png"}
            height={30}
            width={30}
            alt="shadospace-logo"
          />
          Shadospace
        </Link>
        <SignupForm />
      </div>
    </div>
  );
}
