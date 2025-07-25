export default function PrintLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen h-full w-full bg-white">{children}</div>;
}
