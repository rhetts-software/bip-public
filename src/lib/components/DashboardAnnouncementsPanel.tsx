"use client";
import Loading from "@/app/(proper)/loading";
import { useEffect, useState } from "react";
import { getAnnouncements } from "../modules/dal";
import DashboardAnnouncementItem from "./DashboardAnnouncementItem";
import AddItemDialog from "./AddItemDialog";
import ViewAddButtons from "./ViewAddButtons";
import PanelTitle from "./PanelTitle";
import { motion } from "motion/react";

export default function DashboardAnnouncementsPanel() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);
  const [addDialogShown, setAddDialogShown] = useState(false);

  const loadData = () => {
    setLoading(true);
    getAnnouncements().then((result) => {
      setData(result);
      setLoading(false);
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="relative flex flex-col h-full">
      <div className="flex w-full border-b dark:bg-slate-900 dark:border-slate-800 p-4 justify-between items-center gap-x-4">
        <PanelTitle>Announcements</PanelTitle>
        <ViewAddButtons
          onAdd={() => {
            setAddDialogShown(true);
          }}
          viewHref="/app/announcements"
        />
      </div>

      <div className="flex-col h-full flex overflow-y-auto scrollbar">
        <AddItemDialog
          onCancel={() => setAddDialogShown(false)}
          onSuccess={() => {
            loadData();
            setAddDialogShown(false);
          }}
          type="announcement"
          shown={addDialogShown}
        />

        {isLoading && (
          <div className="flex items-center justify-center absolute w-full h-full z-50">
            <Loading />
          </div>
        )}

        <motion.div layout className="p-4 w-full h-full flex-col flex gap-4">
          {data.map((item) => (
            <motion.div layoutId={item.id} key={item.id}>
              <DashboardAnnouncementItem
                onReloadRequested={loadData}
                content={item.content}
                id={item.id}
                title={item.title}
                expiryDate={item.expiry_date}
                pinned={item.pinned}
                profile={item.profile}
                scheduledAt={item.scheduled_at}
                createdAt={item.created_at}
                priority={item.priority}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
