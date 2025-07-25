import Link from "next/link";
import { dateToUserFriendlyString } from "../modules/utils";
import {
  TbChevronCompactLeft,
  TbChevronCompactRight,
  TbChevronLeft,
  TbChevronRight,
} from "react-icons/tb";
import React, { useRef, useState } from "react";

interface CarouselAnnouncementProps {
  height?: number;
  items: {
    id: string;
    title: string;
    content: string;
    created_at: string;
    banner_image: string;
  }[];
}
export default function CarouselAnnouncement({
  items = [],
  height = 25,
}: CarouselAnnouncementProps) {
  const scrollable = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  return (
    <div
      style={{ height: height + "rem" }}
      className={`w-full relative overflow-hidden flex`}
    >
      <div
        ref={scrollable}
        className={`h-full p-12 overflow-x-scroll no-scrollbar gap-12 flex flex-nowrap items-center justify-start transition-all duration-500 ease-in-out scroll-smooth ${
          isScrolling ? "scroll-behavior-smooth" : ""
        }`}
      >
        {items.map((item, index) => (
          <Link
            style={{
              backgroundImage: item.banner_image
                ? `url(${item.banner_image})`
                : "url(/background.svg)",
            }}
            key={item.id}
            href={`/app/announcements/${item.id}`}
            className="h-full overflow-hidden border bg-center bg-cover border-gray-300 dark:border-slate-500 rounded-xl min-w-180 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
          >
            <div className="h-full dark:bg-transparent p-4 gap-4 justify-end w-full bg-gradient-to-t bg-linear-0 from-black/30 dark:from-black/80 dark:to-black/0 flex flex-col transition-all duration-300 ease-in-out">
              <div className="flex gap-4 items-center justify-start transform transition-transform duration-200 ease-in-out">
                <span className="text-2xl text-white dark:text-white font-bold transition-all duration-200 ease-in-out">
                  {item.title}
                </span>
                <span className="text-xl text-gray-200 dark:text-gray-400 transition-all duration-200 ease-in-out">
                  {dateToUserFriendlyString(new Date(item.created_at))}
                </span>
              </div>
              <span className="text-xl text-white dark:text-white line-clamp-1 transition-all duration-200 ease-in-out">
                {item.content}
              </span>
            </div>
          </Link>
        ))}
      </div>
      <div className="absolute pointer-events-none *:pointer-events-auto *:cursor-pointer px-2 flex justify-between items-center top-0 left-0 w-full h-full">
        <button
          onClick={() => {
            if (!scrollable.current) return;
            setIsScrolling(true);

            // If at the start, scroll to end
            if (scrollable.current.scrollLeft <= 20) {
              scrollable.current.scrollTo({
                left: scrollable.current.scrollWidth,
                behavior: "smooth",
              });
            } else {
              scrollable.current.scrollBy({
                left: -scrollable.current.offsetWidth * 0.5,
                behavior: "smooth",
              });
            }

            setTimeout(() => setIsScrolling(false), 600);
          }}
          className="bg-emerald-800/70 dark:bg-black/50 py-2 px-1 rounded-full text-white transition-all duration-200 ease-in-out hover:bg-emerald-700/80 dark:hover:bg-black/70 hover:scale-110 transform active:scale-95"
        >
          <TbChevronLeft size={24}></TbChevronLeft>
        </button>
        <button
          onClick={() => {
            if (!scrollable.current) return;
            setIsScrolling(true);

            // If at the end, scroll to start
            const { scrollLeft, scrollWidth, clientWidth } = scrollable.current;
            if (scrollLeft + clientWidth >= scrollWidth - 5) {
              scrollable.current.scrollTo({
                left: 0,
                behavior: "smooth",
              });
            } else {
              scrollable.current.scrollBy({
                left: scrollable.current.offsetWidth * 0.5,
                behavior: "smooth",
              });
            }

            setTimeout(() => setIsScrolling(false), 600);
          }}
          className="bg-emerald-800/70 dark:bg-black/50 py-2 px-1 rounded-full text-white transition-all duration-200 ease-in-out hover:bg-emerald-700/80 dark:hover:bg-black/70 hover:scale-110 transform active:scale-95"
        >
          <TbChevronRight size={24}></TbChevronRight>
        </button>
      </div>
    </div>
  );
}
