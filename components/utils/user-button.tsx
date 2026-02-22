import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Skeleton } from "../ui/skeleton";

type UserButtonProps = {
  showLoginWhenSignedOut?: boolean;
};

export default function UserButton({
  showLoginWhenSignedOut = true,
}: UserButtonProps) {
  const { data: session, isPending, error } = authClient.useSession();
  const router = useRouter();
  const handleSignOut = async () => {
    await authClient.signOut();
    router.refresh();
  };

  if (isPending) {
    return <Skeleton className="h-8 w-8 rounded-full animate-pulse" />;
  }

  if (!session) {
    if (showLoginWhenSignedOut) {
      return (
        <Button asChild>
          <Link href="/signin">Sign in</Link>
        </Button>
      );
    }

    return error ? (
      <p className="text-red-500 text-sm">{error.message}</p>
    ) : null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-2">
          <Avatar className="cursor-pointer h-8 w-8">
            <AvatarImage
              src={session.user.image || "https://github.com/shadcn.png"}
            />
            <AvatarFallback>{session.user.name?.[0] ?? "U"}</AvatarFallback>
          </Avatar>
        </div>
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
              variant="destructive"
              onClick={handleSignOut}
            >
              Logout
            </Button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
