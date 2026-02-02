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
    <header className="border-b fixed top-0 left-0 right-0 backdrop-blur-md">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="Logo" width={35} height={35} />
          <p className="text-2xl uppercase font-mono">shadospace</p>
        </div>
        <nav className="flex items-center gap-2">
          {isPending ? (
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-10 rounded-full" />
            </div>
          ) : session ? (
            <div className="flex items-center gap-2">
              <Button variant="ghost" className="cursor-pointer" asChild>
                <Link href="/profile">Profile</Link>
              </Button>
              <Avatar>
                <AvatarImage
                  src={session.user.image || "https://github.com/shadcn.png"}
                />
                <AvatarFallback>{session.user.name![0]}</AvatarFallback>
              </Avatar>
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
