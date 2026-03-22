import Container from "@/components/layout/container";
import Header from "@/components/layout/header";
export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <Container>{children}</Container>
    </div>
  );
}