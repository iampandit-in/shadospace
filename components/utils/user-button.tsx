"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";
import { useRouter } from "next/navigation";

export default function UserButton() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div>
          {isPending ? (
            <Skeleton className="h-8 w-8 rounded-full animate-pulse" />
          ) : (
            <Avatar className="cursor-pointer">
              <AvatarImage
                height={8}
                width={8}
                loading="eager"
                src={session?.user.image ?? undefined}
              />
              <AvatarFallback>
                {session?.user.name?.charAt(0)?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        <DropdownMenuGroup>
          <DropdownMenuLabel>{session?.user.email}</DropdownMenuLabel>
          <DropdownMenuItem>
            <Link href={"/profile"}>Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={"/dashboard"}>Dashboard</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={"/settings"}>Settings</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          onClick={() =>
            authClient.signOut({
              fetchOptions: { onSuccess: () => router.refresh() },
            })
          }
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
