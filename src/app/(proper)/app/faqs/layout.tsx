import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Bagtas Information Portal",
};
export default function DocumentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  );
}
