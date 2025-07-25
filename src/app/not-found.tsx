"use client";

import ErrorLottie from "@/lib/components/ErrorLottie";
import Link from "next/link";
import { useEffect } from "react";

export default function NotFound() {
  return (
    <div className="bg-white dark:bg-black dark:text-white text-black h-screen w-screen gap-4 flex flex-col items-center justify-center">
      <span className="text-4xl">Oops! Looks like this page doesn't exist</span>
      <span className="text-2xl opacity-50">
        Maybe you mistyped the URL or followed a broken link.
      </span>
      <Link
        href={"/"}
        className=" transition-all py-2 text-xl duration-200 dark:bg-slate-700 cursor-pointer bg-slate-400 text-white border-slate-600  dark:text-white px-4 rounded-lg font-bold border dark:border-slate-500 hover:bg-slate-500 dark:hover:bg-slate-600"
      >
        Return home
      </Link>
    </div>
  );
}
