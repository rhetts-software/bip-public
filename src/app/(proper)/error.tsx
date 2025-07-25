"use client";

import ErrorLottie from "@/lib/components/ErrorLottie";
import { reportError } from "@/lib/modules/dal";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    reportError(error.name, error.message);
  }, [error]);

  return (
    <div className="h-full w-full gap-4 flex flex-col items-center justify-start">
      <div className="w-1/3">
        <ErrorLottie></ErrorLottie>
      </div>
      <span className="text-4xl">Something went wrong!</span>
      <span className="text-2xl opacity-50">
        Rest assured! This has been reported to headquarters!
      </span>
      <button
        className=" transition-all py-2 text-xl duration-200 dark:bg-slate-700 cursor-pointer bg-slate-400 text-white border-slate-600  dark:text-white px-4 rounded-lg font-bold border dark:border-slate-500 hover:bg-slate-500 dark:hover:bg-slate-600"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}
