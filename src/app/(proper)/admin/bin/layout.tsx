import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recycling | Bagtas Information Portal",
};
export default function BinLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
