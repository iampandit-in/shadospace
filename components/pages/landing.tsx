import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Landing() {
  return (
    <div className="container flex flex-col items-center justify-center h-[calc(100vh-12rem)]">
      <h1 className=" text-center text-6xl font font-bold">
        Turn your youtube videos into blog articles
      </h1>
      <p className="text-muted-foreground text-xl max-w-3xl my-4 text-center">
        Shadospace turns your youtube videos into blog articles with power of AI
        with a fully featured dashboard to manage them
      </p>
      <Button size={"lg"} className="mt-6 px-8 text-lg py-5" asChild>
        <Link href={"/auth"}>Get Started</Link>
      </Button>
    </div>
  );
}
