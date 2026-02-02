import Image from "next/image";

import { SignupForm } from "@/components/auth/signup";

export default function SignupPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <Image src="/logo.png" alt="Logo" width={32} height={32} />
          </div>
          <p className="text-xl uppercase font-mono">Shadospace</p>
        </a>
        <SignupForm />
      </div>
    </div>
  );
}
