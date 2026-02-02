import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import LandingPage from "@/components/pages/landing";
import HomePage from "@/components/pages/home";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  return <div>{session ? <HomePage /> : <LandingPage />}</div>;
}
