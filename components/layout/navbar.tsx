"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const {
    data: session,
    isPending, //loading state
    error, //error object
    refetch, //refetch the session
  } = authClient.useSession();
  return (
    <header className="border-b">
      <div className="flex items-center justify-between gap-4 py-4 px-8">
        <Link href={"/"} className="flex items-center gap-2">
          <Image src={"/shadospace.png"} alt="logo" width={30} height={30} />
          <h1 className="text-2xl">shadospace</h1>
        </Link>
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"link"} className="flex items-center gap-1">
                Tutorials <ChevronDown size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-40">
              <DropdownMenuItem>Python</DropdownMenuItem>
              <DropdownMenuItem>DSA</DropdownMenuItem>
              <DropdownMenuItem>MERN</DropdownMenuItem>
              <DropdownMenuItem>PERN</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"link"} className="flex items-center gap-1">
                Projects <ChevronDown size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-60">
              <DropdownMenuItem>Python</DropdownMenuItem>
              <DropdownMenuItem>React + MongoDB</DropdownMenuItem>
              <DropdownMenuItem>React + Firebase</DropdownMenuItem>
              <DropdownMenuItem>React + NEXT + PostgreSQL</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="flex items-center gap-1" variant={"link"}>
                Practice <ChevronDown size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-60">
              <DropdownMenuItem>Python</DropdownMenuItem>
              <DropdownMenuItem>DSA</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center gap-2">
          {session?.user ? (
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size={"icon"}
                    className="flex items-center gap-1"
                    variant={"link"}
                  >
                    <Image
                      src={session.user.image || ""}
                      alt="profile"
                      width={30}
                      height={30}
                      className="rounded-full"
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="min-w-40">
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>
                    <Button
                      variant={"destructive"}
                      onClick={() =>
                        authClient.signOut({
                          fetchOptions: {
                            onSuccess: () => {
                              refetch();
                              router.refresh();
                            },
                          },
                        })
                      }
                    >
                      Logout
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div>
              <Button variant={"link"} asChild>
                <Link href={"/signin"}>Sign In</Link>
              </Button>
              <Button variant={"link"} asChild>
                <Link href={"/signup"}>Sign Up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
