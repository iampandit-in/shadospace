import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import Container from "./container";

export default function Header() {
  return (
    <header className="border-b">
      <Container className="flex items-center justify-between">
        <Link href={"/"} className="flex items-center gap-2">
          <Image src="/logo.png" alt="Logo" width={30} height={30} />
          <h1 className="text-lg font-medium">Shadospace</h1>
        </Link>
        <nav>
          <Button asChild>
            <Link href={"/login"}>Login</Link>
          </Button>
        </nav>
      </Container>
    </header>
  );
}
