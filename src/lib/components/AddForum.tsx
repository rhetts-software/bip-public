"use client";
import { addForumPost } from "../modules/dal";

interface AddForumProps {
  onClick: () => any;
}

export default function AddForum({ onClick }: AddForumProps) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-white dark:bg-slate-800 group border border-gray-300 dark:border-slate-700 rounded-4xl flex flex-col gap-4 cursor-pointer transition-all duration-200"
    >
      <span className="w-full text-xl text-justify group-hover:bg-gray-100 group-hover:dark:bg-slate-900/30 transition-all duration-200 bg-gray-50 dark:bg-slate-900/60 py-4 px-6 text-gray-800 dark:text-white/50 rounded-[1.8rem]">
        Start a discussion...
      </span>
    </button>
  );
}
