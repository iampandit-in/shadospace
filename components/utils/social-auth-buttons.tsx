"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export function SocialAuthButtons() {
  const handleSocialSignIn = async (provider: "github" | "google") => {
    await authClient.signIn.social({
      provider,
      callbackURL: "/",
    });
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex items-center gap-2 my-2">
        <div className="h-px bg-border flex-1" />
        <span className="text-xs text-muted-foreground uppercase">
          Or continue with
        </span>
        <div className="h-px bg-border flex-1" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Button
          variant="outline"
          className="w-full cursor-pointer"
          onClick={() => handleSocialSignIn("github")}
        >
          <FaGithub className="mr-2" />
          GitHub
        </Button>
        <Button
          variant="outline"
          className="w-full cursor-pointer"
          onClick={() => handleSocialSignIn("google")}
        >
          <FcGoogle className="mr-2" />
          Google
        </Button>
      </div>
    </div>
  );
}
