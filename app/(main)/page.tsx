import Landing from "@/components/pages/landing";
import HomePage from "@/components/pages/home";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string }>;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    return <HomePage user={session.user} searchParams={await searchParams} />;
  }

  return <Landing />;
}
