export const metadata = {
  title: "System Administration | Bagtas Information Portal",
  description: "Manage system settings and configurations.",
};
export default function SystemLayout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return <>{children}</>;
}
