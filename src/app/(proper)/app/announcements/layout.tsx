import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Announcements | Bagtas Information Portal",
};
export default function AnnouncementsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
