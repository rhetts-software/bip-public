import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up | Bagtas Information Portal",
};

export default function SignUpLayout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return <>{children}</>;
}
