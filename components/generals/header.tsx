import Image from "next/image";
import { Button } from "../ui/button";

export default function Header() {
  return (
    <div className="max-w-5xl mx-auto p-4 flex justify-between">
      <div className="flex items-center gap-2">
        <Image
          src={"/shadospace.png"}
          alt="shadospace"
          height={36}
          width={36}
        />
        <h1 className="text-2xl font-medium">shadospace</h1>
      </div>
      <nav className="flex items-center gap-2">
        <Button variant={"outline"}>sign in</Button>
      </nav>
    </div>
  );
}
