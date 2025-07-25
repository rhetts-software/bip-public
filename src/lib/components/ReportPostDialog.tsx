import { AnimatePresence, motion } from "motion/react";
import PanelTitle from "./PanelTitle";
import { useActionState, useEffect, useState } from "react";
import { addForumPost, editForumPost, reportPost } from "../modules/dal";
import Dialog from "./Dialog";

interface ReportPostDialogProps {
  shown?: boolean;
  onCancel?: () => any;
  postId?: string;
  onReported?: () => any;
}
export default function ReportPostDialog({
  shown = false,
  onCancel,
  onReported,
  postId,
}: ReportPostDialogProps) {
  const [state, action, pending] = useActionState(reportPost, undefined);
  useEffect(() => {
    if (state?.success) {
      onReported?.();
    }
  }, [state]);
  return (
    <Dialog shown={shown} title={"Report"}>
      <form action={action} className="flex flex-col gap-4">
        <input id="id" name="id" value={postId} type="hidden"></input>
        <select
          id="category"
          name="category"
          className="dark:bg-slate-900 border dark:border-slate-700/50 rounded-xl px-4 py-2 text-lg"
        >
          <option value="" disabled>
            Select a category
          </option>
          <option value={"spam"}>Spam</option>
        </select>
        <textarea
          id="reason"
          name="reason"
          placeholder="Reason"
          className="bg-slate-900/50 border dark:border-slate-700 resize-none h-64 px-6 py-4 text-lg rounded-xl"
        ></textarea>
        <div className="w-full flex gap-2 justify-end">
          <button
            type="reset"
            onClick={() => {
              onCancel?.();
            }}
            className="dark:bg-slate-600/50 px-2 py-1 rounded-lg dark:border-slate-500/50 dark:hover:bg-slate-500/40 transition-all duration-200 cursor-pointer border dark:text-white"
          >
            Cancel
          </button>
          <button
            disabled={pending}
            type="submit"
            className="dark:bg-red-600 px-2 py-1 rounded-lg dark:border-red-500 dark:hover:bg-red-500/80 transition-all duration-200 cursor-pointer border dark:text-white"
          >
            Report
          </button>
        </div>
      </form>
    </Dialog>
  );
}
