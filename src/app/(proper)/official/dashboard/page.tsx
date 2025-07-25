"use client";
import DashboardAnnouncementsPanel from "@/lib/components/DashboardAnnouncementsPanel";
import DashboardDocumentsPanel from "@/lib/components/DashboardDocumentsPanel";
import DashboardFAQsPanel from "@/lib/components/DashboardFAQsPanel";

export default function AdminPage() {
  return (
    <>
      <div className="flex gap-2 max-h-full *:overflow-hidden  *:flex *:flex-col lg:flex-row flex-col *:rounded-2xl *:dark:bg-slate-800/20 *:dark:border-slate-700 *:border w-full min-h-full">
        <div className="flex-1/3 ">
          <DashboardAnnouncementsPanel />
        </div>
        <div className="flex-1/3 ">
          <DashboardDocumentsPanel />
        </div>
        <div className="flex-1/3 ">
          <DashboardFAQsPanel />
        </div>
      </div>
    </>
  );
}
