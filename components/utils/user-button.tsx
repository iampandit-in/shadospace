import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { authClient } from "@/lib/auth-client";
import { Skeleton } from "../ui/skeleton";
import LoadingButton from "./loading-button";
import { redirect } from "next/navigation";
import Link from "next/link";

export function UserButton() {
  const { data: session, isPending } = authClient.useSession();
  if (isPending) {
    return <Skeleton className="w-7 h-7" />;
  }
  if (!session) {
    return (
      <Button variant="outline" asChild>
        <Link href="/login">Login</Link>
      </Button>
    );
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="w-7 h-7">
          <AvatarImage
            className="rounded-none"
            src={session?.user.image || ""}
            alt="user-img"
          />
          <AvatarFallback>{session.user.name?.charAt(0)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        <DropdownMenuGroup>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/dashboard">Dashboard</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/dashboard/new/post">New Post</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <LoadingButton
              variant="destructive"
              onClick={() =>
                authClient.signOut({
                  fetchOptions: {
                    onSuccess: () => {
                      redirect("/login");
                    },
                  },
                })
              }
              loadingText="Signing out..."
              className="w-full"
            >
              Log out
            </LoadingButton>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
