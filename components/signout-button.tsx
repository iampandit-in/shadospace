"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button";

export default function SignOutButton() {
  return (
    <form action={async () => {
      await authClient.signOut();
    }}>
      <Button variant="destructive" type="submit" className="w-full cursor-pointer">
        Sign Out
      </Button>
    </form>
  );
}