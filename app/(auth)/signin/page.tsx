import Image from "next/image";

import { LoginForm } from "@/components/auth/signin";

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <Image src="/logo.png" alt="Logo" width={30} height={30} />
          <p className="text-xl uppercase font-mono">Shadospace</p>
        </a>
        <LoginForm />
      </div>
    </div>
  );
}
