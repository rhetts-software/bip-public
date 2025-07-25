import { AnimatePresence, motion } from "motion/react";
import PanelTitle from "./PanelTitle";
import { useActionState, useEffect, useState } from "react";
import { addForumPost, editForumPost } from "../modules/dal";
import PendingSubmitFormButton from "./PendingSubmitFormButton";
import Dialog from "./Dialog";

interface EditPostDialogProps {
  shown?: boolean;
  onCancel?: () => any;
  onEdit?: (post: any) => any;
  title?: string;
  content?: string;
  postId?: string;
}
export default function EditPostDialog({
  shown = false,
  onCancel,
  onEdit,
  title,
  content,
  postId,
}: EditPostDialogProps) {
  const [state, action, pending] = useActionState(editForumPost, undefined);
  useEffect(() => {
    if (state?.posted) {
      onEdit?.(state?.posted);
    }
  }, [state]);
  return (
    <Dialog shown={shown} title={"Edit Post"} onCancel={onCancel}>
      <form action={action} className="flex flex-col gap-4">
        <input id="id" name="id" value={postId} type="hidden"></input>
        <input
          id="title"
          name="title"
          defaultValue={title}
          placeholder="Title"
          className="dark:bg-slate-900/50 border dark:border-slate-700 px-6 py-4 text-2xl rounded-xl"
        ></input>
        <textarea
          id="content"
          name="content"
          defaultValue={content}
          placeholder="Discussion"
          className="dark:bg-slate-900/50 border dark:border-slate-700 resize-none h-64 px-6 py-4 text-lg rounded-xl"
        ></textarea>
        <div className="w-full flex gap-2 justify-end">
          <button
            type="reset"
            onClick={() => {
              onCancel?.();
            }}
            className="dark:border-slate-500 hover:bg-slate-500 dark:hover:bg-slate-600 dark:bg-slate-700 bg-slate-400 text-white border-slate-600  dark:text-white  px-3 py-2 rounded-lg border  transition-all duration-200"
          >
            Discard
          </button>
          <button
            disabled={pending}
            type="submit"
            className="ark:border-brand-green-400 hover:bg-brand-blue-600 dark:hover:bg-brand-green-500 dark:bg-brand-green-600 bg-brand-blue-500 border-brand-blue-700 text-white   dark:text-white px-3 py-2 rounded-lg border flex items-center gap-2 transition-all duration-200"
          >
            <PendingSubmitFormButton
              text="Edit"
              loadingText="Editing"
              pending={pending}
            ></PendingSubmitFormButton>
          </button>
        </div>
      </form>
    </Dialog>
  );
}
