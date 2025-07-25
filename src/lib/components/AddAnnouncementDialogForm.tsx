import { useActionState, useEffect, useState } from "react";
import { addAnnouncement } from "../modules/dal";
import PendingSubmitFormButton from "./PendingSubmitFormButton";
import Dialog from "./Dialog";

interface AddAnnouncementDialogForm {
  onCancel?: () => any;
  onSuccess?: () => any;
}

export default function AddAnnouncementDialogForm({
  onCancel,
  onSuccess,
}: AddAnnouncementDialogForm) {
  const [state, action, pending] = useActionState(addAnnouncement, undefined);
  const [scheduleDialogShown, setScheduleDialogShown] = useState(false);

  useEffect(() => {
    if (state && state.success) {
      onSuccess?.();
    }
  }, [state]);

  const baseInputClass =
    "bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700/50 rounded-xl px-4 py-2 text-lg text-gray-800 dark:text-white";
  const labelTextClass = "px-1 text-gray-800 dark:text-white/80";

  return (
    <form
      action={action}
      className="px-4 pt-6 pb-2 gap-4 flex flex-col bg-white dark:bg-slate-800 rounded-lg"
    >
      {scheduleDialogShown && (
        <Dialog compact shown={scheduleDialogShown} title={"Schedule For"}>
          <div className="flex flex-col gap-1 text-gray-800 dark:text-white/80">
            <input
              className={baseInputClass}
              type="datetime-local"
              id="scheduleAt"
              name="scheduleAt"
            />
            {state?.errors?.properties?.scheduleAt?.errors && (
              <span className="pl-1 text-red-500 text-sm">
                {state.errors.properties.scheduleAt.errors[0]}
              </span>
            )}
          </div>
          <div className="w-full flex gap-2 justify-end pt-2">
            <button
              type="reset"
              onClick={() => setScheduleDialogShown(false)}
              className="bg-gray-100 dark:bg-slate-600/50 px-2 py-1 rounded-lg border border-gray-300 dark:border-slate-500/50 hover:bg-gray-200 dark:hover:bg-slate-500/40 text-gray-800 dark:text-white transition-all duration-200"
              disabled={pending}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-600 dark:bg-brand-green-600 px-2 py-1 rounded-lg border border-green-600 dark:border-brand-green-500 hover:bg-green-700 dark:hover:bg-brand-green-500/80 text-white flex items-center gap-2 transition-all duration-200"
              disabled={pending}
            >
              <PendingSubmitFormButton
                text="Post"
                loadingText="Posting"
                pending={pending}
              />
            </button>
          </div>
        </Dialog>
      )}

      {/* Title */}
      <label htmlFor="title" className="flex flex-col gap-1">
        <span className={labelTextClass}>Title</span>
        <input id="title" name="title" type="text" className={baseInputClass} />
        {state?.errors?.properties?.title?.errors && (
          <span className="pl-1 text-red-500 text-sm">
            {state.errors.properties.title.errors[0]}
          </span>
        )}
      </label>

      {/* Content */}
      <label htmlFor="content" className="flex flex-col gap-1">
        <span className={labelTextClass}>Content</span>
        <textarea
          id="content"
          name="content"
          className={`${baseInputClass} resize-none h-48`}
        />
        {state?.errors?.properties?.content?.errors && (
          <span className="pl-1 text-red-500 text-sm">
            {state.errors.properties.content.errors[0]}
          </span>
        )}
      </label>

      {/* Banner */}
      <label htmlFor="banner" className="flex flex-col gap-1">
        <span className={labelTextClass}>Banner</span>
        <input
          id="banner"
          name="banner"
          type="file"
          accept="image/*"
          className={`${baseInputClass} file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-brand-blue-500 file:text-white hover:file:bg-brand-blue-600`}
        />
      </label>

      {/* Expiry */}
      <label htmlFor="expiry" className="flex flex-col gap-1">
        <span className={labelTextClass}>Expires at</span>
        <input
          id="expiry"
          name="expiry"
          type="date"
          className={baseInputClass}
        />
        {state?.errors?.properties?.expiry?.errors && (
          <span className="pl-1 text-red-500 text-sm">
            {state.errors.properties.expiry.errors[0]}
          </span>
        )}
      </label>

      {/* Priority */}
      <label htmlFor="priority" className="flex flex-col gap-1">
        <span className={labelTextClass}>Priority</span>
        <select id="priority" name="priority" className={baseInputClass}>
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

      {/* Pinned */}
      <label htmlFor="pinned" className="flex items-center gap-2">
        <span className={labelTextClass}>Pinned</span>
        <input
          id="pinned"
          name="pinned"
          type="checkbox"
          className="w-4 h-4 text-green-600 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded focus:ring-green-500"
        />
      </label>

      {/* Actions */}
      <div className="w-full flex gap-2 justify-end pt-2">
        <button
          type="reset"
          onClick={() => onCancel?.()}
          className="dark:border-slate-500 hover:bg-slate-500 dark:hover:bg-slate-600 dark:bg-slate-700 bg-slate-400 text-white border-slate-600  dark:text-white  px-3 py-2 rounded-lg border  transition-all duration-200"
          disabled={pending}
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={() => setScheduleDialogShown(true)}
          className="ark:border-brand-green-400 hover:bg-brand-blue-600 dark:hover:bg-brand-green-500 dark:bg-brand-green-600 bg-brand-blue-500 border-brand-blue-700 text-white   dark:text-white px-3 py-2 rounded-lg border flex items-center gap-2 transition-all duration-200"
          disabled={pending}
        >
          Schedule Post
        </button>
        <button
          type="submit"
          className="ark:border-brand-green-400 hover:bg-brand-blue-600 dark:hover:bg-brand-green-500 dark:bg-brand-green-600 bg-brand-blue-500 border-brand-blue-700 text-white   dark:text-white px-3 py-2 rounded-lg border flex items-center gap-2 transition-all duration-200"
          disabled={pending}
        >
          <PendingSubmitFormButton
            text="Post"
            loadingText="Posting"
            pending={pending}
          />
        </button>
      </div>
    </form>
  );
}
