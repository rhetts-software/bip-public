import { Metadata } from "next";

export const metadata: Metadata = {
  title: "E-mail Verification",
};
export default function SignInLayout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return <>{children}</>;
}
