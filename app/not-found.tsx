import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
        <Image src="/logo.png" alt="shadospace" width={128} height={128} className="dark:invert"/>
        <h1 className="text-4xl font-bold">Shadospace</h1>
        <p className="text-lg">Page Not Found</p>
        <Button variant="outline" asChild>
            <Link href="/">Go to Home</Link>
        </Button>
    </div>
  )
}