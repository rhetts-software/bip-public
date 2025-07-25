"use client";

import { TbPinFilled } from "react-icons/tb";
import { dateToUserFriendlyString } from "../modules/utils";
import Link from "next/link";
import ForumPostContent from "./ForumPostContent";

export default function Announcement({
  announcements,
}: {
  announcements: {
    id?: string | number;
    title: string;
    content: string;
    created_at: string;
    pinned?: boolean | number;
  }[];
}) {
  return (
    <div className="space-y-6 w-full flex flex-col">
      {announcements.length > 0 ? (
        announcements.map((item, idx) => {
          return item.pinned ? (
            <div key={idx} className="flex w-full flex-col">
              <div
                className="p-6 rounded-lg shadow-lg flex flex-col gap-4 w-full
                border border-double  border-slate-400 bg-gradient-to-r from:bg-transparent via-80% dark:via-brand-green-400/20 dark:to-brand-green-400/30
                 transition-all duration-200 dark:border-brand-green-400 via-brand-blue-300/20 to-brand-blue-300/30"
              >
                <div className="flex items-center gap-2 ">
                  <span className="opacity-60  text-gray-700 dark:text-gray-200">
                    {dateToUserFriendlyString(new Date(item.created_at))}
                  </span>
                  <TbPinFilled
                    size={24}
                    className="dark:text-brand-green-400 text-brand-blue-600"
                  ></TbPinFilled>
                </div>
                <Link
                  href={`/app/announcements/${item.id}`}
                  className="text-2xl font-bold hover:underline"
                >
                  {item.title}
                </Link>
                <ForumPostContent content={item.content} />
              </div>
            </div>
          ) : (
            <div key={idx} className="flex flex-col w-full">
              <div
                className={`p-6 rounded-lg dark:border-slate-500 border-slate-400 shadow-lg flex flex-col gap-4 w-full
                border
                 transition-all duration-200`}
              >
                <div className="flex items-center gap-2 ">
                  <span className="opacity-60  text-gray-700 dark:text-gray-200">
                    {dateToUserFriendlyString(new Date(item.created_at))}
                  </span>
                </div>
                <Link
                  href={`/app/announcements/${item.id}`}
                  className="text-2xl font-bold hover:underline"
                >
                  {item.title}
                </Link>
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-200">
          No announcements yet.
        </p>
      )}
    </div>
  );
}
