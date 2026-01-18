import LandingPage from "@/components/pages/landing";
import { auth } from "@/lib/auth";
import Home from "@/components/pages/home";
import { headers } from "next/headers";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (session?.user) {
    return <Home />;
  }
  return <LandingPage />;
}
