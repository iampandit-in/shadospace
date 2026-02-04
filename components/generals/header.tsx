"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Skeleton } from "../ui/skeleton";

export default function Header() {
  const { data: session, isPending } = authClient.useSession();
  return (
    <header className="border-b bg-background/50 z-50 fixed top-0 left-0 right-0 backdrop-blur-md">
      <div className="container flex items-center justify-between">
        <Link href={"/"} className="flex items-center gap-2">
          <Image
            loading="lazy"
            src="/logo.png"
            alt="Logo"
            width={100}
            height={100}
            className="h-8 w-8"
          />
          <p className="text-xl uppercase font-mono">shadospace</p>
        </Link>
        <nav className="flex items-center gap-2">
          {isPending ? (
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-10 rounded-full" />
            </div>
          ) : session ? (
            <div className="flex items-center gap-2">
              <Link href="/profile">
                <Avatar>
                  <AvatarImage
                    src={session.user.image || "https://github.com/shadcn.png"}
                  />
                  <AvatarFallback>{session.user.name![0]}</AvatarFallback>
                </Avatar>
              </Link>
            </div>
          ) : (
            <>
              <Button className="cursor-pointer" asChild>
                <Link href="/signin">Sign In</Link>
              </Button>
              <Button className="cursor-pointer" asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
