import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LandingPage() {
  return (
    <main>
      <div className="container flex h-[calc(100vh-1rem)] items-center justify-center">
        <div className="flex flex-col gap-4">
          <h1 className="text-5xl font-semibold text-center tracking-tight">
            The best blogging platform for developers and teams.
          </h1>
          <p className="text-xl text-center text-muted-foreground">
            Start a solo blog for free and scale to thousands of members.
            Customizable with domain mapping and headless mode. Trusted by
            millions of developers worldwide.
          </p>
          <div className="flex gap-2 justify-center">
            <Button size={"lg"}>
              <Link href="/signup">Get started</Link>
            </Button>
            <Button variant="outline" size={"lg"}>
              <Link href="/signin">Sign in</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
