import Header from "@/components/generals/header";
import React from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="pt-20 container">{children}</main>
    </>
  );
}
