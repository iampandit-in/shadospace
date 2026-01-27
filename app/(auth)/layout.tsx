export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="p-4 mt-10 md:mt-16">{children}</div>;
}
