import Home from "@/components/pages/home";
import Landing from "@/components/pages/landing";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session ? <Home /> : <Landing />;
}
