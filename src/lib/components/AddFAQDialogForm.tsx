import { useActionState, useEffect, useState } from "react";
import { getFAQCategories, addFAQ } from "../modules/dal";
import { AddFAQFormState } from "../modules/forms";
import PendingSubmitFormButton from "./PendingSubmitFormButton";

interface AddFAQDialogFormProps {
  onCancel?: () => void;
  onSuccess?: () => void;
}

export default function AddFAQDialogForm({
  onCancel,
  onSuccess,
}: AddFAQDialogFormProps) {
  const [categories, setCategories] = useState<{ name: string; id: number }[]>(
    []
  );
  const [state, action, pending] = useActionState<AddFAQFormState, FormData>(
    addFAQ,
    {
      errors: undefined,
      values: {},
      success: false,
    }
  );

  useEffect(() => {
    getFAQCategories().then(setCategories);
  }, []);

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
      {/* Question */}
      <label htmlFor="question" className="flex flex-col gap-1">
        <span className={labelTextClass}>Question</span>
        <input
          id="question"
          name="question"
          type="text"
          defaultValue={(state?.values?.question as string) ?? ""}
          className={baseInputClass}
        />
        {state?.errors?.properties?.question?.errors && (
          <span className="text-red-500 text-sm">
            {state.errors.properties.question.errors[0]}
          </span>
        )}
      </label>

      {/* Answer */}
      <label htmlFor="answer" className="flex flex-col gap-1">
        <span className={labelTextClass}>Answer</span>
        <textarea
          id="answer"
          name="answer"
          defaultValue={(state?.values?.answer as string) ?? ""}
          className={`${baseInputClass} resize-none h-48`}
        ></textarea>
        {state?.errors?.properties?.answer?.errors && (
          <span className="text-red-500 text-sm">
            {state.errors.properties.answer.errors[0]}
          </span>
        )}
      </label>

      {/* Category */}
      <label htmlFor="category" className="flex flex-col gap-1">
        <span className={labelTextClass}>Category</span>
        <select
          name="category"
          id="category"
          defaultValue={(state?.values?.category as string) ?? ""}
          className={baseInputClass}
        >
          <option value="" disabled>
            Select a category
          </option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        {state?.errors?.properties?.category?.errors && (
          <span className="text-red-500 text-sm">
            {state.errors.properties.category.errors[0]}
          </span>
        )}
      </label>

      {/* Buttons */}
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
