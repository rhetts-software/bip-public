"use client";

import { use, useEffect, useState } from "react";
import { TbMenu2 } from "react-icons/tb";
import NavigationSidebarEntry from "./NavigationSidebarEntry";
import { getNavigation } from "../modules/dal";
import NavigationSidebarGroup from "./NavigationSidebarGroup";
import { usePathname } from "next/navigation";

export default function NavigationSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [links, setLinks] = useState<any[]>([]);
  const [groupedLinks, setGroupedLinks] = useState<any[]>([]);

  const pathname = usePathname();

  useEffect(() => {
    getNavigation().then((nav) => {
      setLinks(nav);
      console.log(nav);
    });
  }, []);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 1000) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    }
    handleResize(); // Set initial state
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    const grouped = links.reduce((acc, item) => {
      const [, root] = item.href.split("/"); // get the first segment after empty string
      const key = `${root}`;

      if (!acc[key]) {
        acc[key] = [];
      }

      acc[key].push(item);
      return acc;
    }, {});
    setGroupedLinks(grouped);
  }, [links]);
  return (
    <div
      onMouseEnter={() => {
        setHovered(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
      }}
      className={`relative overflow-hidden h-screen ${
        collapsed && !hovered ? "w-15" : "min-w-72"
      } p-2 min-w-15 transition-all duration-300`}
    >
      <div className="absolute w-64 h-full text-nowrap dark:text-white/70 text-black/80 flex flex-col">
        <button
          onClick={() => {
            setCollapsed(!collapsed);
            setHovered(false);
          }}
          className="w-12 h-12 p-2 flex items-center justify-center cursor-pointer hover:bg-black/15 transition-all duration-300 rounded-xl"
        >
          <TbMenu2 size={24} className="w-8 h-8"></TbMenu2>
        </button>
        <div className="overflow-scroll no-scrollbar flex flex-col gap-2 h-full">
          {Object.entries(groupedLinks).map(([key, links]) => (
            <NavigationSidebarGroup
              key={key}
              currentPath={pathname}
              title={key}
              links={links}
              collapsed={collapsed && !hovered}
            ></NavigationSidebarGroup>
          ))}
        </div>
      </div>
    </div>
  );
}
