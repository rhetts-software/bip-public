import { getProfile, getUser } from "@/lib/modules/dal";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Account",
};
export default function AccountLayout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return <>{children}</>;
}
