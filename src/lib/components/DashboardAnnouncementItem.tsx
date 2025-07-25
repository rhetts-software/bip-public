import Link from "next/link";
import { TbPinFilled } from "react-icons/tb";
import { dateToUserFriendlyString, returnExpiry } from "../modules/utils";
import Image from "next/image";
import Options from "./Options";
import AnnouncementOptions from "./AnnouncementOptions";
import { useState } from "react";

interface DashboardAnnouncementItemProps {
  id: string;
  title: string;
  expiryDate?: string;
  pinned: boolean;
  createdAt: string;
  content: string;
  profile: {
    first_name: string;
    middle_name: string;
    last_name: string;
    avatar: string;
  };
  scheduledAt?: string;
  priority: number;
  onReloadRequested?: () => any;
}
export default function DashboardAnnouncementItem({
  id,
  title,
  expiryDate,
  pinned,
  content,
  createdAt,
  profile,
  priority,
  scheduledAt,
  onReloadRequested,
}: DashboardAnnouncementItemProps) {
  const [markedForDelete, setMarkedForDelete] = useState(false);
  return (
    <div
      className={`${
        markedForDelete ? "opacity-30" : ""
      } border dark:text-white hover:dark:bg-slate-700/50 transition-all duration-200 dark:bg-slate-800 px-8 py-6 rounded-xl flex flex-col gap-4 dark:border-slate-700 relative`}
    >
      <div className="flex items-center gap-2 justify-between relative">
        <div className="flex items-center gap-2 z-10 relative">
          <div className="flex items-center justify-center h-8 w-8 rounded-full overflow-hidden">
            <Image
              src={profile.avatar ? profile.avatar : "/default_user.svg"}
              alt=""
              height={32}
              width={32}
            />
          </div>
          <span>
            {[profile.first_name, profile.middle_name, profile.last_name].join(
              " "
            )}
          </span>
          <span className="opacity-30">
            {dateToUserFriendlyString(new Date(createdAt))}
          </span>
        </div>
        <AnnouncementOptions
          onReloadRequested={onReloadRequested}
          onDeleteRequested={() => {
            setMarkedForDelete(true);
          }}
          id={id}
          title={title}
          content={content}
          priority={priority}
          pinned={pinned}
          scheduledAt={scheduledAt}
        ></AnnouncementOptions>
      </div>
      <div className="flex gap-4 z-10 relative">
        {pinned && <TbPinFilled className="text-brand-green-500" size={24} />}
        <Link
          href={`/app/announcements/${id}`}
          className="text-xl font-bold cursor-pointer text-ellipsis hover:underline"
        >
          {title}
        </Link>
      </div>
      <div className="flex z-10 relative">
        {expiryDate && (
          <span className=" dark:bg-slate-700 rounded-lg px-2 py-1 dark:border-slate-600 border">
            {returnExpiry(new Date(expiryDate))}
          </span>
        )}
        {scheduledAt && Date.now() <= new Date(scheduledAt).valueOf() && (
          <span className=" dark:bg-slate-700 rounded-lg px-2 py-1 dark:border-slate-600 border">
            Scheduled at:{" "}
            {new Date(scheduledAt).toLocaleTimeString("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            })}
          </span>
        )}
      </div>
    </div>
  );
}
