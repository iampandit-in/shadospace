import LoginForm from "@/components/forms/signin";
import Image from "next/image";
import Link from "next/link";

export default function page() {
  return (
    <div className="flex flex-col items-center h-[calc(100vh-4rem)] justify-center gap-6">
      <Link href={"/"} className="flex items-center gap-2">
        <Image src={"/logo.png"} alt="shadospace logo" height={25} width={25} />
        <h1 className="text-lg font-medium">Shadospace</h1>
      </Link>
      <LoginForm />
      <div className="flex items-center gap-2">
        <p className="text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href={"/signup"} className="text-primary">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}
