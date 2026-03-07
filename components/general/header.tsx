"use client";

import Image from "next/image";
import { UserButton } from "../utils/user-button";

export default function Header() {
  return (
    <div className="border-b">
      <header className="container p-4 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Image
            src={"/logo.png"}
            height={28}
            width={28}
            alt="shadospace-logo"
          />

          <p className="text-xl font-medium">Shadospace</p>
        </div>
        <nav className="flex items-center gap-2">
          <UserButton />
        </nav>
      </header>
    </div>
  );
}
