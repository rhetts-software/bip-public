import AccountButton from "@/lib/components/AccountButton";
import NavigationSidebar from "@/lib/components/NavigationSidebar";

import { Metadata } from "next";
import { Suspense } from "react";

import BarangaySeal from "@/lib/components/BarangaySeal";
import { getUserAndBasicProfile } from "@/lib/modules/dal";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Home | Bagtas Information Portal",
};

export default async function AppProperLayout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  const data = await getUserAndBasicProfile();
  return (
    <div className="w-screen overflow-hidden h-screen flex dark:bg-brand-blue-950/50 bg-brand-blue-100/50">
      <NavigationSidebar></NavigationSidebar>
      <div className="flex-1 w-[50%] border-1 flex-col border-neutral-400 flex items-start justify-center dark:border-neutral-800 ml-1 mt-1 mr-2 rounded-t-2xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="z-50 h-32 flex w-full p-8 justify-between">
          <div className="p-4">
            <BarangaySeal></BarangaySeal>
          </div>
          <AccountButton
            displayText={data ? data.profile.first_name : "User"}
            profileImage={data ? data.profile.avatar : undefined}
          ></AccountButton>
        </div>
        <div className="overflow-y-scroll rounded-b-2xl flex-1 w-full lg:py-12 lg:px-16 py-6 px-8">
          <Suspense>{children}</Suspense>
        </div>
      </div>
    </div>
  );
  // ₱1,395.44 <- Pro amount ng Supabase :)
}
