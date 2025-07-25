import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Users | Bagtas Information Portal",
};
export default function AllUsersLayout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return <>{children}</>;
}
