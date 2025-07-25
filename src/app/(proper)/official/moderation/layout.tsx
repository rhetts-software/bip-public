import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Moderation | Bagtas Information Portal",
};
export default function DashboardLayout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return <>{children}</>;
}
