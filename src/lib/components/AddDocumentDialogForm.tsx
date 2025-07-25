import { useActionState, useEffect } from "react";
import { addDocument } from "../modules/dal";
import PendingSubmitFormButton from "./PendingSubmitFormButton";

interface AddDocumentDialogFormProps {
  onCancel?: () => any;
  onSuccess?: () => any;
}

export default function AddDocumentDialogForm({
  onCancel,
  onSuccess,
}: AddDocumentDialogFormProps) {
  const [state, action, pending] = useActionState(addDocument, undefined);
  useEffect(() => {
    if (state && state.success) {
      onSuccess?.();
    }
  }, [state]);

  const baseInputClass =
    "bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700/50 rounded-xl px-4 py-2 text-lg text-gray-800 dark:text-white";
  const labelTextClass = "px-1 text-gray-800 dark:text-white/80";

  // Add your available tags here
  const availableTags = [
    "Confidential",
    "Official",
    "Urgent",
    "Clearance",
    "Indigency",
    "Permit",
    "Incident Report",
    "Resolution",
    "Budget",
    "Certificate",
  ];

  return (
    <form
      action={action}
      className="px-4 pt-6 pb-2 gap-4 flex flex-col bg-white dark:bg-slate-800 rounded-lg"
    >
      {/* Display Name */}
      <label htmlFor="display_name" className="flex flex-col gap-1">
        <span className={labelTextClass}>Display Name</span>
        <input
          id="display_name"
          name="display_name"
          type="text"
          className={baseInputClass}
        />
        {state?.errors?.properties?.display_name?.errors && (
          <span className="pl-1 text-red-500 text-sm">
            {state.errors.properties.display_name.errors[0]}
          </span>
        )}
      </label>

      {/* Document Upload */}
      <label htmlFor="file" className="flex flex-col gap-1">
        <span className={labelTextClass}>Document</span>
        <input id="file" name="file" type="file" className={baseInputClass} />
        {state?.errors?.properties?.file?.errors && (
          <span className="pl-1 text-red-500 text-sm">
            {state.errors.properties.file.errors[0]}
          </span>
        )}
      </label>

      {/* Category */}
      <label htmlFor="category" className="flex flex-col gap-1">
        <span className={labelTextClass}>Category</span>
        <select
          id="category"
          name="category"
          defaultValue=""
          className={baseInputClass}
        >
          <option value="" disabled>
            Select a category
          </option>
          <option value="document">Document</option>
          <option value="report">Report</option>
          <option value="budget">Budget</option>
        </select>
        {state?.errors?.properties?.category?.errors && (
          <span className="pl-1 text-red-500 text-sm">
            {state.errors.properties.category.errors[0]}
          </span>
        )}
      </label>

      {/* Tags Checklist */}
      <label htmlFor="tags" className="flex flex-col gap-1">
        <span className={labelTextClass}>Tags</span>
        <div className="flex flex-wrap gap-3">
          {availableTags.map((tag) => (
            <label
              key={tag}
              className="flex items-center gap-2 text-gray-800 dark:text-white/80"
            >
              <input
                type="checkbox"
                name="tags"
                value={tag}
                className="accent-green-600 dark:accent-brand-green-600"
              />
              <span>{tag}</span>
            </label>
          ))}
        </div>
        {state?.errors?.properties?.tags?.errors && (
          <span className="pl-1 text-red-500 text-sm">
            {state.errors.properties.tags?.errors?.[0]}
          </span>
        )}
      </label>

      {/* Action Buttons */}
      <div className="w-full flex gap-2 justify-end pt-2">
        <button
          type="reset"
          onClick={() => onCancel?.()}
          disabled={pending}
          className="dark:border-slate-500 hover:bg-slate-500 dark:hover:bg-slate-600 dark:bg-slate-700 bg-slate-400 text-white border-slate-600  dark:text-white  px-3 py-2 rounded-lg border  transition-all duration-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={pending}
          className="ark:border-brand-green-400 hover:bg-brand-blue-600 dark:hover:bg-brand-green-500 dark:bg-brand-green-600 bg-brand-blue-500 border-brand-blue-700 text-white   dark:text-white px-3 py-2 rounded-lg border flex items-center gap-2 transition-all duration-200"
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
