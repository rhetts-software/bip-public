import { Metadata } from "next";
import "./global.css";

export const metadata: Metadata = {
  title: "Bagtas Information Portal",
};
export default function RootLayout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return (
    <html lang="en">
      <body
        className={`overscroll-none border-neutral-400 antialiased bg-linear-45/oklch w-screen max-w-screen bg-white dark:bg-black p-0 m-0 from-brand-blue-300 to-brand-green-500 via-50% via-emerald-300 dark:via-80% dark:via-emerald-700 dark:from-brand-blue-800 dark:to-emerald-800 `}
      >
        {children}
      </body>
    </html>
  );
}
