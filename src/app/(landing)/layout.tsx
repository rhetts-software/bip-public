import LandingPageNavBar from "@/lib/components/LandingPageNavBar";

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-white/50 dark:bg-black/50 ">
      <LandingPageNavBar>{children}</LandingPageNavBar>
    </div>
  );
}
