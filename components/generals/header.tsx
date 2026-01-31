import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { redirect } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default async function Header() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl">
      <div className="max-w-5xl mx-auto p-4 flex justify-between">
        <Link href={"/"} className="flex items-center gap-2">
          <Image
            src={"/shadospace.png"}
            alt="shadospace"
            height={36}
            width={36}
          />
          <h1 className="text-2xl font-medium">shadospace</h1>
        </Link>
        <nav className="flex items-center gap-2">
          {session ? (
            <nav className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar>
                      <AvatarImage
                        src={session.user.image || ""}
                        alt="shadospace"
                      />
                      <AvatarFallback>
                        {session.user.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Link href={"/dashboard"}>dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href={"/settings"}>settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <div>
                      <form
                        action={async () => {
                          "use server";
                          await auth.api.signOut({
                            headers: await headers(),
                          });
                          revalidatePath("/");
                          redirect("/signin");
                        }}
                      >
                        <Button
                          type="submit"
                          className="cursor-pointer"
                          variant={"destructive"}
                        >
                          Sign Out
                        </Button>
                      </form>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant={"outline"} asChild>
                <Link href="/signin">Sign In</Link>
              </Button>
              <Button variant={"default"} asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
