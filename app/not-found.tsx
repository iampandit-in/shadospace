import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <div className="flex gap-4 flex-col items-center justify-center h-screen">
      <Image src="/logo.png" alt="404" width={50} height={50} />
      <p className="text-2xl font-medium">404 - Page Not Found</p>
      <Button variant={"outline"} asChild>
        <Link href="/">Go to Home</Link>
      </Button>
    </div>
  );
}
