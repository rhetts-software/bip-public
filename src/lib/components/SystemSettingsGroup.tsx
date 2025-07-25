import { TbChevronDown, TbChevronRight } from "react-icons/tb";
import PanelTitle from "./PanelTitle";
import SystemSettingsEntry from "./SystemSettingsEntry";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MdOpacity } from "react-icons/md";

interface SystemSettingsGroupProps {
  title: string;
  items: {
    key: string;
    value: string;
    description: string;
    title: string;
    id: string;
  }[];
}
export default function SystemSettingsGroup({
  title,
  items,
}: SystemSettingsGroupProps) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="w-full pb-6 px-24  dark:text-white">
      <button
        onClick={() => {
          setCollapsed(!collapsed);
        }}
        className="flex items-center gap-2"
      >
        <TbChevronDown
          className={`${
            collapsed ? "-rotate-90" : ""
          } transition-transform duration-200`}
        ></TbChevronDown>
        <PanelTitle>{title}</PanelTitle>
      </button>
      <div
        className={`${
          collapsed ? "max-h-0 opacity-0 p-0" : "py-12"
        } flex flex-col w-full transition-all duration-200 px-12  overflow-hidden`}
      >
        {items.map((item) => (
          <SystemSettingsEntry
            id={item.id}
            settingKey={item.key}
            key={item.key}
            title={item.title}
            value={item.value}
            description={item.description}
          ></SystemSettingsEntry>
        ))}
      </div>
    </div>
  );
}
