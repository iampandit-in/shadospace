"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  return (
    <main>
      <div className="mt-16">
        <div className="container">
          <h1 className="text-3xl md:text-5xl font-semibold text-center">
            The best blogging platform for developers and teams.
          </h1>
          <p className="text-base md:text-lg my-4 text-center text-muted-foreground">
            Start a solo blog for free and scale to thousands of members.
            Customizable with domain mapping and headless mode. Trusted by
            millions of developers worldwide.
          </p>
          <div className="flex flex-col md:flex-row gap-2 justify-center">
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
            <Button
              className="h-12 w-full md:w-44 cursor-pointer rounded-xl flex items-center gap-1"
              variant="outline"
              size={"lg"}
              onClick={() => {
                authClient.signIn.social({
                  provider: "google",
                });
              }}
            >
              <Image src="/google.png" alt="Google" width={20} height={20} />
              Signin with Google
            </Button>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border mt-10 overflow-hidden">
          <Image
            src="/landing.png"
            alt="Landing"
            width={1000}
            height={1000}
            className="w-full h-auto"
          />
        </div>
      </div>
    </main>
  );
}
