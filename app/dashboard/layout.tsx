"use client";

import { AppSidebar } from "@/components/app-sidebar";
import DashoboardHeader from "@/components/general/dashoboard-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import React from "react";

export default function Page({ children }: { children: React.ReactNode }) {
  const { data: session } = authClient.useSession();
  if (!session) {
    redirect("/login");
  }
  const user = session?.user;
  return (
    <SidebarProvider>
      <AppSidebar user={user} />
      <SidebarInset>
        <DashoboardHeader />
        <main className="p-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
