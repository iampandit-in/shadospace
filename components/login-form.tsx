import { Button } from "@/components/ui/button"
import Image from "next/image"

export function LoginForm() {
  return (
    <div>
      <h1 className="text-2xl text-center">Login to
        <span className="text-red-400 ml-1">Shadowspace
        </span>
      </h1>
      <Button variant={"outline"} className="w-full mt-4">
        <Image src={"/google.png"} alt="google logo" height={15} width={15}/>
        login with Google
      </Button>
    </div>
  )
}
