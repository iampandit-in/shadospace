import React from "react";
import LoadingButton from "./loading-button";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

export default function LogoutButton() {
  return (
    <LoadingButton
      onClick={() =>
        authClient.signOut({
          fetchOptions: {
            onSuccess: () => {
              redirect("/login");
            },
          },
        })
      }
      loadingText="Signing out..."
    >
      Sign out
    </LoadingButton>
  );
}
