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

export default async function Header() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <header className="border-b">
      <div className="max-w-5xl mx-auto p-4 flex justify-between">
        <div className="flex items-center gap-2">
          <Image
            src={"/shadospace.png"}
            alt="shadospace"
            height={36}
            width={36}
          />
          <h1 className="text-2xl font-medium">shadospace</h1>
        </div>
        <nav className="flex items-center gap-2">
          {session ? (
            <nav className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center gap-2">
                    <Image
                      className="rounded-full"
                      src={session.user.image || "/avatar.png"}
                      alt="shadospace"
                      height={36}
                      width={36}
                    />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Link href={"/profile"}>profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href={"/dashboard"}>dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <div>
                      <Button
                        variant={"outline"}
                        className="cursor-pointer"
                        asChild
                      ></Button>
                      <form
                        action={async () => {
                          "use server";
                          await auth.api.signOut({
                            headers: await headers(),
                          });
                          revalidatePath("/");
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
