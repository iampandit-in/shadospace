"use client";

import Image from "next/image";
import Link from "next/link";
import UserButton from "../utils/user-button";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

export default function Header() {
  return (
    <header className="border-b bg-background/50 z-50 fixed top-0 left-0 right-0 backdrop-blur-md">
      <div className="container flex items-center justify-between">
        <Link href={"/"} className="flex items-center gap-2">
          <Image
            src={`/logo.png`}
            alt="Shadospace"
            width={100}
            height={100}
            className="h-7 w-7"
            loading="eager"
            priority
          />
          <p className="text-xl font-semibold">Shadospace</p>
        </Link>
        <nav className="flex items-center gap-2">
          <Button asChild>
            <Link href="/create/post">
              Create post <Plus />
            </Link>
          </Button>
          <UserButton />
        </nav>
      </div>
    </header>
  );
}
