"use client";
import PanelTitle from "@/lib/components/PanelTitle";
import SystemSettingsGroup from "@/lib/components/SystemSettingsGroup";
import SystemTools from "@/lib/components/SystemTools";
import { getSystemSettings } from "@/lib/modules/dal";
import { SystemSettingsGroupType } from "@/lib/modules/types";
import { useEffect, useState } from "react";
import { TbSettings } from "react-icons/tb";
import Loading from "../../loading";

export default function SystemPage() {
  const [data, setData] = useState<SystemSettingsGroupType[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getSystemSettings().then((settings) => {
      setData(settings);
      setLoading(false);
    });
  }, []);
  if (loading) {
    return <Loading></Loading>;
  }
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
      <div className="p-6 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2 mb-4">
          <TbSettings className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          <PanelTitle>System Administration</PanelTitle>
        </div>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          Manage system settings and configurations.
        </p>
      </div>
      <div className="w-full flex flex-col py-12">
        <SystemTools></SystemTools>
        {data.map((group) => (
          <SystemSettingsGroup
            key={group.title}
            title={group.title}
            items={group.settings}
          ></SystemSettingsGroup>
        ))}
      </div>
    </div>
  );
}
