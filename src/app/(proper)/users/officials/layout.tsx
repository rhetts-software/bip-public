import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Officials | Bagtas Information Portal",
};
export default function OfficialUsersLayout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return <>{children}</>;
}
