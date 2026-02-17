"use client";

import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Skeleton } from "../ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { ArrowDown, ChevronDown } from "lucide-react";

export default function Header() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const handleSignOut = () => {
    authClient.signOut();
    router.refresh();
  };
  return (
    <header className="border-b bg-background/50 z-50 fixed top-0 left-0 right-0 backdrop-blur-md">
      <div className="container flex items-center justify-between">
        <Link href={"/"} className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Logo"
            width={100}
            height={100}
            className="h-8 w-8"
            loading="eager"
            priority
          />
          <p className="text-2xl font-medium">shadospace</p>
        </Link>
        <nav className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">
                Tutorials <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/tutorials/python">Python</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/tutorials/javascript">JavaScript</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
        <nav className="flex items-center gap-2">
          {isPending ? (
            <div className="flex items-center gap-2">
              <Skeleton className="h-10 w-10 rounded-full animate-pulse" />
            </div>
          ) : session ? (
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={
                        session.user.image || "https://github.com/shadcn.png"
                      }
                    />
                    <AvatarFallback>{session.user.name![0]}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                      <Link href="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/create/post">Create</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/settings">Settings</Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Button
                        className="cursor-pointer"
                        variant={"destructive"}
                        onClick={handleSignOut}
                      >
                        Logout
                      </Button>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <>
              <Button variant={"outline"} className="cursor-pointer" asChild>
                <Link href="/signin">Sign In</Link>
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
