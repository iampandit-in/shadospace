import Header from "@/components/generals/header";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto p-4">{children}</main>
    </>
  );
}
