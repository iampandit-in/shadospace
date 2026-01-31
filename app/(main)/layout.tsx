import { HomeRightSidebar } from "@/components/home-right-sidebar";
import { HomeSidebar } from "@/components/home-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <HomeSidebar />
      <SidebarInset>{children}</SidebarInset>
      <HomeRightSidebar />
    </SidebarProvider>
  );
}
