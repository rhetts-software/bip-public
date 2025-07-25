import { useActionState, useEffect, useState } from "react";
import { getFAQCategories, editFAQ } from "../modules/dal";
import { EditFAQFormState } from "../modules/forms";
import PendingSubmitFormButton from "./PendingSubmitFormButton";
import Dialog from "./Dialog";

interface EditFAQDialogProps {
  shown: boolean;
  id: string;
  question: string;
  answer: string;
  category: string;
  onCancel?: () => void;
  onSuccess?: () => void;
}

export default function EditFAQDialog({
  shown,
  id,
  question,
  answer,
  category,
  onCancel,
  onSuccess,
}: EditFAQDialogProps) {
  const [categories, setCategories] = useState<{ name: string; id: number }[]>(
    []
  );
  const [state, action, pending] = useActionState<EditFAQFormState, FormData>(
    editFAQ,
    undefined
  );

  useEffect(() => {
    getFAQCategories().then(setCategories);
  }, []);

  useEffect(() => {
    if (state && state.success) {
      onSuccess?.();
    }
  }, [state]);

  return (
    <Dialog shown={shown} onCancel={onCancel} title="Edit FAQ">
      <form action={action} className="px-4 pt-6 pb-2 gap-4 flex flex-col">
        <input type="hidden" name="id" value={id} />
        <label
          htmlFor="question"
          className="flex flex-col gap-1 dark:text-white/80"
        >
          <span className="px-1">Question</span>
          <input
            id="question"
            name="question"
            type="text"
            defaultValue={(state?.values?.question as string) ?? question}
            className="dark:bg-slate-900 border dark:border-slate-700/50 rounded-xl px-4 py-2 text-lg"
          />
          {state?.errors?.properties?.question?.errors && (
            <span className="text-red-500 text-sm">
              {state.errors.properties.question.errors[0]}
            </span>
          )}
        </label>

        <label
          htmlFor="answer"
          className="flex flex-col gap-1 dark:text-white/80"
        >
          <span className="px-1">Answer</span>
          <textarea
            id="answer"
            name="answer"
            defaultValue={(state?.values?.answer as string) ?? answer}
            className="dark:bg-slate-900 border dark:border-slate-700/50 rounded-xl resize-none px-4 py-2 text-lg h-48"
          ></textarea>
          {state?.errors?.properties?.answer?.errors && (
            <span className="text-red-500 text-sm">
              {state.errors.properties.answer.errors[0]}
            </span>
          )}
        </label>

        <label
          htmlFor="category"
          className="flex flex-col gap-1 dark:text-white/80"
        >
          <span className="px-1">Category</span>
          <select
            name="category"
            id="category"
            defaultValue={(state?.values?.category as string) ?? category}
            className="dark:bg-slate-900 border dark:border-slate-700/50 rounded-xl px-4 py-2 text-lg"
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
            type="submit"
            disabled={pending}
            className="dark:bg-brand-green-600 flex items-center justify-center px-2 py-1 rounded-lg dark:border-brand-green-500 dark:hover:bg-brand-green-500/80 transition-all duration-200 cursor-pointer border dark:text-white"
          >
            <PendingSubmitFormButton
              text="Save"
              loadingText="Saving"
              pending={pending}
            />
          </button>
        </div>
      </form>
    </Dialog>
  );
}
