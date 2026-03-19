import Image from "next/image";
import Link from "next/link";
import SignUpForm from "@/components/forms/signup";

export default function page() {
  return (
    <div className="flex flex-col items-center h-[calc(100vh-4rem)] justify-center gap-6">
      <Link href={"/"} className="flex items-center gap-2">
        <Image src={"/logo.png"} alt="shadospace logo" height={25} width={25} />
        <h1 className="text-lg font-medium">Shadospace</h1>
      </Link>
      <SignUpForm />
      <div className="flex items-center gap-2">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href={"/signin"} className="text-primary">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
