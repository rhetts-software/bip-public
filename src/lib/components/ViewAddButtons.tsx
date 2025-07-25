"use client";
import Link from "next/link";

interface ViewAddButtonsProps {
  viewHref: string;
  onAdd?: () => any;
}

export default function ViewAddButtons({
  viewHref,
  onAdd,
}: ViewAddButtonsProps) {
  return (
    <div className="flex gap-2 items-center justify-center">
      <Link
        className="text-nowrap h-full transition-all duration-200  cursor-pointer   px-4 rounded-lg font-bold border dark:border-slate-500 hover:bg-slate-500 dark:hover:bg-slate-600 dark:bg-slate-700 bg-slate-400 text-white border-slate-600  dark:text-white"
        href={viewHref}
      >
        View All
      </Link>
      <button
        onClick={() => {
          onAdd && onAdd();
        }}
        className="transition-all h-full duration-200  cursor-pointer   px-4 rounded-lg font-bold border dark:border-brand-green-400 hover:bg-brand-blue-600 dark:hover:bg-brand-green-500 dark:bg-brand-green-600 bg-brand-blue-500 border-brand-blue-700 text-white   dark:text-white"
      >
        Add
      </button>
    </div>
  );
}
