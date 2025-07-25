import Image from "next/image";
import Link from "next/link";
import { TbMessage } from "react-icons/tb";
import { dateToUserFriendlyString } from "../modules/utils";
import {
  getUserPostReaction,
  reactToPost,
  removePostReaction,
} from "../modules/dal";
import ForumPostContent from "./ForumPostContent";
import Reaction from "./Reaction";
interface ForumPostProps {
  id: string;
  profile: {
    avatar?: string;
    first_name: string;
    middle_name: string;
    last_name: string;
  };
  created_at: string;
  title: string;
  archived: boolean;
  content: string;
  comment_count: number;
  likes: number;
  dislikes: number;
}

export default function ForumPost({
  id,
  profile,
  created_at,
  archived,
  title,
  content,
  comment_count,
  likes,
  dislikes,
}: ForumPostProps) {
  return (
    <div key={id} className={`block shadow-xl`}>
      <div className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 p-6 rounded-lg shadow text-emerald-900 dark:text-white transition-transform duration-300">
        <div className="p-1 flex items-center gap-2 mb-2 bg-gradient-to-r dark:from-brand-blue-900 dark:to-blue-900 from-brand-green-200 to-emerald-200 rounded-lg py-2 ">
          <div className="border h-8 w-8 flex items-center justify-center rounded-full overflow-hidden">
            <Image
              width={32}
              height={32}
              src={profile?.avatar || "/default_user.svg"}
              alt=""
            />
          </div>
          <span className="text-lg">
            {[profile?.first_name, profile?.middle_name, profile?.last_name]
              .filter(Boolean)
              .join(" ")}
          </span>
          <span className="opacity-90 px-2 text-sm">
            {dateToUserFriendlyString(new Date(created_at))}
          </span>
          {archived && (
            <span className="border px-2 py-1 rounded-lg">Archived</span>
          )}
        </div>
        <div className="px-2 flex flex-col group border-b pb-4 border-black/30">
          <Link
            href={`/app/posts/${id}`}
            className="text-2xl py-4 font-bold cursor-pointer mb-2 hover:underline"
          >
            {title}
          </Link>
          <ForumPostContent content={content}></ForumPostContent>
        </div>
        <div className="py-4 flex gap-4">
          <Reaction
            parentId={id}
            initialLikes={likes ?? 0}
            initialDislikes={dislikes ?? 0}
            react={reactToPost}
            removeReaction={removePostReaction}
            fetchInitialReaction={getUserPostReaction}
          ></Reaction>
          <Link
            href={`/app/posts/${id}`}
            className="transition-all duration-200 text-lg flex cursor-pointer dark:text-white hover:text-brand-green-400 items-center gap-2"
          >
            <TbMessage size={24}></TbMessage>
            <span className="">
              {comment_count ?? 0} comment
              {comment_count === 1 ? "" : "s"}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
