import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | Bagtas Information Portal",
};
export default function SignInLayout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return <>{children}</>;
}
