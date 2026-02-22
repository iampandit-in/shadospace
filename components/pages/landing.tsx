"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import LoadingButton from "../utils/loading-button";
import { useTransition } from "react";

export default function LandingPage() {
  const [isPending, startTransition] = useTransition();

  const onGoogleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(async () => {
      await authClient.signIn.social({
        provider: "google",
      });
    });
  };
  return (
    <main>
      <div className="flex items-center justify-center h-[calc(100vh-12rem)]">
        <div className="container">
          <h1 className="text-3xl md:text-5xl font-semibold text-center">
            The best platform for developers and content creators.
          </h1>
          <p className="text-base md:text-lg my-4 text-center text-muted-foreground">
            Document your code and share your knowledge with the world.
          </p>
          <div className="mt-10 flex flex-col md:flex-row gap-2 justify-center">
            <Button
              className="h-12 w-full md:w-44 cursor-pointer rounded-xl flex items-center gap-2"
              variant={"default"}
              size={"lg"}
              asChild
            >
              <Link className="flex items-center gap-2" href="/signup">
                Signup for free <ArrowRight />
              </Link>
            </Button>
            <form onSubmit={onGoogleSubmit}>
              <LoadingButton
                loading={isPending}
                loadingText="Connecting..."
                className="h-12 w-full md:w-44 cursor-pointer rounded-xl flex items-center gap-1"
                variant="outline"
                size="lg"
              >
                <Image src="/google.png" alt="Google" width={20} height={20} />
                Signin with Google
              </LoadingButton>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
