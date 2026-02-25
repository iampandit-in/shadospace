import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";

export default function Header() {
  return (
    <div className="border-b">
      <header className="container p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="Logo" width={30} height={30} />
          <p className="text-lg font-semibold">Shadospace</p>
        </div>
        <nav>
          <Button>Sign In</Button>
        </nav>
      </header>
    </div>
  );
}
