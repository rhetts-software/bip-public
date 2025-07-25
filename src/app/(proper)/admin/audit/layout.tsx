import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Audit | Bagtas Information Portal",
};
export default function AuditLayout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return <>{children}</>;
}
