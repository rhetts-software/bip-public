import { useActionState, useEffect } from "react";
import { addDocument, editAnnouncement, editDocument } from "../modules/dal";

import PendingSubmitFormButton from "./PendingSubmitFormButton";
import Dialog from "./Dialog";

interface EditDocumentDialogProps {
  shown: boolean;
  onSuccess?: () => any;
  onCancel?: () => any;
  id: string;
  name: string;
  category: string;
}
export default function EditDocumentDialog({
  shown,
  onCancel,
  onSuccess,
  id,
  name,
  category,
}: EditDocumentDialogProps) {
  const [state, action, pending] = useActionState(editDocument, undefined);
  useEffect(() => {
    if (state && state.success) {
      onSuccess?.();
    }
  }, [state]);
  return (
    <Dialog shown={shown} onCancel={onCancel} title={"Edit"}>
      <form action={action} className="px-4 pt-6 pb-2 gap-4 flex flex-col">
        <input id="id" name="id" type="hidden" value={id}></input>
        <label
          htmlFor="display_name"
          className="flex flex-col gap-1 dark:text-white/80"
        >
          <span className="px-1">Display Name</span>
          <input
            id="display_name"
            name="display_name"
            type="text"
            defaultValue={name || ""}
            className="dark:bg-slate-900 border dark:border-slate-700/50 rounded-xl px-4 py-2 text-lg"
          ></input>
          {state?.errors?.properties?.display_name?.errors && (
            <span className="pl-1 text-red-500 text-sm">
              {state.errors.properties.display_name.errors[0]}
            </span>
          )}
        </label>

        <label
          htmlFor="category"
          className="flex flex-col gap-1 dark:text-white/80"
        >
          <span className="px-1">Category</span>
          <select
            defaultValue={category || ""}
            name="category"
            id="category"
            className="dark:bg-slate-900 border dark:border-slate-700/50 rounded-xl px-4 py-2 text-lg"
          >
            <option value="" disabled>
              Select a category
            </option>
            <option value={"document"}>Document</option>
            <option value={"report"}>Report</option>
            <option value={"budget"}>Budget</option>
          </select>
          {state?.errors?.properties?.category?.errors && (
            <span className="pl-1 text-red-500 text-sm">
              {state.errors.properties.category.errors[0]}
            </span>
          )}
        </label>

        <div className="w-full flex gap-2 justify-end">
          <button
            type="reset"
            onClick={() => {
              onCancel?.();
            }}
            disabled={pending}
            className="dark:bg-slate-600/50 px-2 py-1 rounded-lg dark:border-slate-500/50 dark:hover:bg-slate-500/40 transition-all duration-200 cursor-pointer border dark:text-white"
          >
            Cancel
          </button>
          <button
            disabled={pending}
            type="submit"
            className="dark:bg-brand-green-600 flex items-center justify-center px-2 py-1 rounded-lg dark:border-brand-green-500 dark:hover:bg-brand-green-500/80 transition-all duration-200 cursor-pointer border dark:text-white"
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
