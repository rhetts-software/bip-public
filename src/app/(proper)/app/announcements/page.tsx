"use client";
import { useEffect, useState } from "react";
import { fetchAnnouncements } from "@/lib/modules/dal";
import Announcement from "@/lib/components/Announcement";
import CarouselAnnouncement from "@/lib/components/CarouselAnnouncement";
import PanelTitle from "@/lib/components/PanelTitle";
import Loading from "../../loading";

export default function AnnouncementsPage() {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnnouncements()
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((e) => console.error("Error fetching announcements:", e.message));
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="text-gray-900 dark:text-white gap-4 flex flex-col rounded-2xl bg-white dark:bg-slate-800/20 border border-slate-400 dark:border-slate-700 w-full">
      {/* Announcements Title */}
      <div className="flex justify-center items-center pt-12 pb-6 border-b dark:border-slate-700 border-slate-400 flex-col gap-4 ">
        <PanelTitle>Announcements</PanelTitle>
        <span className="opacity-60 text-lg">
          Keep up with the latest news!
        </span>
      </div>

      <div className="min-h-screen w-full space-y-16 py-12 px-4 bg-gray-50 dark:bg-transparent">
        <Announcement announcements={data} />
      </div>
    </div>
  );
}
