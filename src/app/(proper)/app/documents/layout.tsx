import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Documents | Bagtas Information Portal",
};
export default function DocumentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
