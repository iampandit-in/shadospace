import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 h-[calc(100vh-12rem)]">
      <h1 className="text-5xl font-bold max-w-4xl text-center">
        All in one platform for all of your needs
      </h1>
      <p className="text-xl max-w-xl text-center my-4">
        Learn, practice, and build projects with our comprehensive platform
      </p>
      <div className="flex items-center gap-2">
        <Button
          className="px-5 py-4 cursor-pointer"
          size={"lg"}
          variant={"default"}
          asChild
        >
          <Link href={"/signin"}>
            Get Started <ChevronRight />
          </Link>
        </Button>
        <Button
          className="px-5 py-4 cursor-pointer"
          size={"lg"}
          variant={"outline"}
        >
          Learn More
        </Button>
      </div>
    </div>
  );
}
