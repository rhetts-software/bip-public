import { TbChevronDown, TbChevronRight } from "react-icons/tb";
import PanelTitle from "./PanelTitle";
import { useState } from "react";
import CustomPost from "./systemTools/CustomPost";

export default function SystemTools() {
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
        <PanelTitle>Tools</PanelTitle>
      </button>
      <div
        className={`${
          collapsed ? "max-h-0 opacity-0 p-0" : "py-12"
        } flex flex-col w-full transition-all duration-200 px-12  overflow-hidden`}
      >
        <CustomPost></CustomPost>
      </div>
    </div>
  );
}
