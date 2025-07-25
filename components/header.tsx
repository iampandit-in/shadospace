import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";

export default function Header() {
  return (
    <header className="p-5 top-0 left-0 right-0 fixed z-50 border-b">
      <div className="flex items-center justify-between mx-auto max-w-5xl">
        <Link className="flex items-center gap-2" href="/">
        <Image src="/logo.png" alt="shadospace" width={32} height={32} className="dark:invert"/>
        <h1 className="text-2xl font-bold">Shadospace</h1>
        </Link>
        <nav className="flex items-center gap-2">
            <Button variant="outline">
                <Link href="/login">Login</Link>
            </Button>
            <Button variant="outline">
                <Link href="/register">Register</Link>
            </Button>
        </nav>
      </div>
    </header>
  );
}