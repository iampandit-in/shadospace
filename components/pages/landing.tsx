import React from "react";
import { Button } from "../ui/button";

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 h-[calc(100vh-12rem)]">
      <h1 className="text-6xl font-bold max-w-6xl text-center">
        All in one platform for all of your needs
      </h1>
      <p className="text-xl max-w-4xl text-center my-4">
        Learn, practice, and build projects with our comprehensive platform
      </p>
      <div className="flex items-center gap-2">
        <Button size={"lg"} variant={"default"}>
          Get Started
        </Button>
        <Button size={"lg"} variant={"outline"}>
          Learn More
        </Button>
      </div>
    </div>
  );
}
