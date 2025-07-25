import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Post",
};
export default function PostLayout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return <>{children}</>;
}
