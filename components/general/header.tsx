"use client";

import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { Skeleton } from "../ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { Button } from "../ui/button";

export default function Header() {
  const { data: session, isPending } = authClient.useSession();
  return (
    <div className="border-b">
      <header className="container p-4 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Image src="/logo.png" alt="Logo" width={30} height={30} />
          <p className="text-xl font-medium">Shadospace</p>
        </div>
        <nav>
          {isPending ? (
            <Skeleton className="h-8 w-8 rounded-full animate-pulse" />
          ) : session ? (
            <div className="flex items-center gap-2">
              <Link href={"/dashboard"}>
                <Avatar>
                  <AvatarImage src={session?.user.image || ""} alt="user-img" />
                  <AvatarFallback>
                    {session.user.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant={"secondary"} asChild>
                <Link href={"/login"}>Login</Link>
              </Button>
              <Button variant={"outline"} asChild>
                <Link href={"/signup"}>Signup</Link>
              </Button>
            </div>
          )}
        </nav>
      </header>
    </div>
  );
}
