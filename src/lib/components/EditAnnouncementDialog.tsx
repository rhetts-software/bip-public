import { useActionState, useEffect } from "react";
import { editAnnouncement } from "../modules/dal";

import PendingSubmitFormButton from "./PendingSubmitFormButton";
import Dialog from "./Dialog";

interface EditAnnouncementDialogProps {
  shown: boolean;
  onSuccess?: () => any;
  onCancel?: () => any;
  id: string;
  title: string;
  content: string;
  priority: number;
  pinned: boolean;
  expiry?: string;
}
export default function EditAnnouncementDialog({
  shown,
  onCancel,
  onSuccess,
  title,
  id,
  content,
  expiry,
  priority,
  pinned,
}: EditAnnouncementDialogProps) {
  const [state, action, pending] = useActionState(editAnnouncement, undefined);
  useEffect(() => {
    if (state?.success) {
      onSuccess?.();
    }
  }, [state]);
  return (
    <Dialog shown={shown} onCancel={onCancel} title={"Edit"}>
      <form action={action} className="px-4 pt-6 pb-2 gap-4 flex flex-col">
        <input id="id" name="id" type="hidden" value={id}></input>
        <label
          htmlFor="title"
          className="flex flex-col gap-1 dark:text-white/80"
        >
          <span className="px-1">Title</span>

          <input
            id="title"
            name="title"
            type="text"
            defaultValue={title || ""}
            className="dark:bg-slate-900 border dark:border-slate-700/50 rounded-xl px-4 py-2 text-lg"
          />
          {state?.errors?.properties?.title?.errors && (
            <span className="pl-1 text-red-500 text-sm">
              {state.errors.properties.title.errors[0]}
            </span>
          )}
        </label>
        <label
          htmlFor="content"
          className="flex flex-col gap-1 dark:text-white/80"
        >
          <span className="px-1">Content</span>
          <textarea
            id="content"
            name="content"
            defaultValue={content || ""}
            className="dark:bg-slate-900 border dark:border-slate-700/50 rounded-xl resize-none px-4 py-2 text-lg h-48"
          />
          {state?.errors?.properties?.content?.errors && (
            <span className="pl-1 text-red-500 text-sm">
              {state.errors.properties.content.errors[0]}
            </span>
          )}
        </label>
        <label
          htmlFor="banner"
          className="flex flex-col gap-1 dark:text-white/80"
        >
          <span className="px-1">Banner</span>
          <input
            id="banner"
            name="banner"
            type="file"
            accept="image/*"
            className="dark:bg-slate-900 border dark:border-slate-700/50 rounded-xl px-4 py-2 text-lg"
          />
        </label>
        <label
          htmlFor="expiry"
          className="flex flex-col gap-1 dark:text-white/80"
        >
          <span className="px-1">Expires at</span>
          <input
            id="expiry"
            name="expiry"
            defaultValue={expiry || ""}
            type="date"
            className="dark:bg-slate-900 border dark:border-slate-700/50 rounded-xl px-4 py-2 text-lg"
          />
          {state?.errors?.properties?.expiry?.errors && (
            <span className="pl-1 text-red-500 text-sm">
              {state.errors.properties.expiry.errors[0]}
            </span>
          )}
        </label>
        <label
          htmlFor="priority"
          className="flex flex-col gap-1 dark:text-white/80"
        >
          <span className="px-1">Priority</span>
          <select
            id="priority"
            name="priority"
            defaultValue={priority || 0}
            className="dark:bg-slate-900 border dark:border-slate-700/50 rounded-xl px-4 py-2 text-lg"
          >
            <option value={0}>Low</option>
            <option value={1}>Medium</option>
            <option value={2}>High</option>
          </select>
          {state?.errors?.properties?.priority?.errors && (
            <span className="pl-1 text-red-500 text-sm">
              {state.errors.properties.priority.errors[0]}
            </span>
          )}
        </label>
        <label htmlFor="pinned" className="flex gap-1 dark:text-white/80">
          <span className="px-1">Pinned</span>
          <input
            id="pinned"
            name="pinned"
            type="checkbox"
            defaultChecked={pinned}
            className="dark:bg-slate-900 border dark:border-slate-700/50 rounded-xl px-4 py-2 text-lg"
          />
        </label>
        <div className="w-full flex gap-2 justify-end">
          <button
            type="reset"
            onClick={() => {
              onCancel?.();
            }}
            className="dark:bg-slate-600/50 px-2 py-1 rounded-lg dark:border-slate-500/50 dark:hover:bg-slate-500/40 transition-all duration-200 cursor-pointer border dark:text-white"
            disabled={pending}
          >
            Cancel
          </button>
          <button
            type="submit"
            className=" dark:bg-brand-green-600 px-2 py-1 rounded-lg dark:border-brand-green-500 dark:hover:bg-brand-green-500/80 transition-all duration-200 cursor-pointer border dark:text-white flex items-center gap-2"
            disabled={pending}
          >
            <PendingSubmitFormButton
              text="Post"
              loadingText="Posting"
              pending={pending}
            ></PendingSubmitFormButton>
          </button>
        </div>
      </form>
    </Dialog>
  );
}
