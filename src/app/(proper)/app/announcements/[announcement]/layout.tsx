import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Announcement",
};
export default function AnnouncementLayout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return <>{children}</>;
}
