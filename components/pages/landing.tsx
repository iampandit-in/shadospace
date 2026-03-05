import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Landing() {
  return (
    <div className="container p-4 flex flex-col items-center justify-center h-[calc(100vh-12rem)]">
      <h1 className=" text-center text-2xl md:text-6xl font font-bold">
        The simple blog platform for content creators
      </h1>
      <p className="text-muted-foreground md:text-xl max-w-3xl my-4 text-center">
        Shadospace is a simple and easy blog platform for developers and content
        creators with power of AI fully open source.
      </p>
      <Button size={"lg"} className="mt-6 px-6 text-lg py-4" asChild>
        <Link href={"/login"}>Get Started</Link>
      </Button>
    </div>
  );
}
