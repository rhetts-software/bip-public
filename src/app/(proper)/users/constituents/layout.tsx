import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Constituents | Bagtas Information Portal",
};
export default function ConstituentUsersLayout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return <>{children}</>;
}
