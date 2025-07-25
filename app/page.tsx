import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Welcome to Shadospace</h1>
      <p className="text-lg">
        Shadospace is a platform for creating and sharing your ideas.
      </p>
      <div className="flex items-center gap-2">
      <Button variant="outline">
        <Link href="/signin">Sign In</Link>
      </Button>
      <Button variant="outline">
          <Link href="/signup">Sign Up</Link>
        </Button>
      </div>
    </div>
  );
}
