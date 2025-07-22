"use client"

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { signIn } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center mt-44 gap-4 p-8">
      <h2 className="text-lg md:text-xl font-semibold">
        Sign In to <span className="text-red-400 ml-1">Shadospace</span>
      </h2>
      <p className="text-xs md:text-sm text-center max-w-xs">
        Login to Shadospace with your Google account to access your dashboard and manage your posts.
      </p>
      <Button
        variant="outline"
        className={cn("w-full max-w-xs gap-2 cursor-pointer flex items-center justify-center")}
        disabled={loading}
        onClick={async () => {
          await signIn.social(
            {
              provider: "google",
              callbackURL: "/profile"
            },
            {
              onRequest: () => setLoading(true),
              onResponse: () => setLoading(false),
            }
          );
        }}
      >
        <img src="/google.png" alt="Google" className="w-5 h-5" />
        Sign in with Google
      </Button>
    </div>
  );
}