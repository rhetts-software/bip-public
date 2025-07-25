"use client";

import { useActionState, useEffect, useState } from "react";
import { addCensorWord, getCensored } from "../modules/dal";
import PendingSubmitFormButton from "./PendingSubmitFormButton";
import Dialog from "./Dialog";

interface ManageCensoredProps {
  onCancel?: () => any;
  onSuccess?: () => any;
  shown: boolean;
}

export default function ManageCensored({ onCancel, onSuccess, shown }: ManageCensoredProps) {
  const [state, action, pending] = useActionState(addCensorWord, undefined);
  const [censoredWords, setCensoredWords] = useState<any[]>([]);

  useEffect(() => {
    console.log("shown changed", shown);
    if (shown) {
      (async () => {
        const wait = await getCensored();
        setCensoredWords(wait || []);
        console.debug("Fetched censored words:", wait);
      })();
    }
  }, [shown, state]);

  const baseInputClass =
    "bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700/50 rounded-xl px-4 py-2 text-lg text-gray-800 dark:text-white";
  const labelTextClass = "px-1 text-gray-800 dark:text-white/80";

  return (
    <Dialog shown={shown} title="Manage Censored Words">
      <form
        action={action}
        key={state?.success ? Math.random() : "form"}
        className="flex flex-col gap-4 bg-white dark:bg-slate-800 rounded-lg p-4"
        autoComplete="off"
      >
        {/* Word */}
        <label htmlFor="word" className="flex flex-col gap-1">
          <span className={labelTextClass}>Word</span>
          <input id="word" name="word" type="text" className={baseInputClass} autoComplete="off" />
          {state?.errors?.properties?.word?.errors?.[0] && (
            <span className="pl-1 text-red-500 text-sm">{state.errors.properties.word.errors[0]}</span>
          )}
        </label>
        {/* Category */}
        <label htmlFor="category" className="flex flex-col gap-1">
          <span className={labelTextClass}>Category</span>
          <select
            id="category"
            name="category"
            className={baseInputClass}
            defaultValue=""
            autoComplete="off"
          >
            <option value="" disabled>
              Select a category
            </option>
            <option value="swear">Swear</option>
            <option value="ascii">ASCII</option>
            <option value="other">Other</option>
          </select>
          {state?.errors?.properties?.category?.errors?.[0] && (
            <span className="pl-1 text-red-500 text-sm">{state.errors.properties.category.errors[0]}</span>
          )}
        </label>
        {/* Severity */}
        <label htmlFor="severity" className="flex flex-col gap-1">
          <span className={labelTextClass}>Severity (1-5)</span>
          <input id="severity" name="severity" type="number" min={1} max={5} className={baseInputClass} autoComplete="off" />
          {state?.errors?.properties?.severity?.errors?.[0] && (
            <span className="pl-1 text-red-500 text-sm">{state.errors.properties.severity.errors[0]}</span>
          )}
        </label>
        {/* Actions */}
        <div className="w-full flex gap-2 justify-end pt-2">
          <button
            type="reset"
            onClick={() => onCancel?.()}
            className="bg-gray-100 dark:bg-slate-600/50 px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-500/50 hover:bg-gray-200 dark:hover:bg-slate-500/40 text-gray-800 dark:text-white transition-all duration-200"
            disabled={pending}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-green-600 dark:bg-brand-green-600 px-3 py-2 rounded-lg border border-green-600 dark:border-brand-green-500 hover:bg-green-700 dark:hover:bg-brand-green-500/80 text-white flex items-center gap-2 transition-all duration-200"
            disabled={pending}
          >
            <PendingSubmitFormButton text="Add" loadingText="Adding..." pending={pending} />
          </button>
        </div>
      </form>
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Censored Words</h2>
        <ul className="list-disc pl-5 max-h-40 overflow-y-auto">
          {censoredWords.length > 0 ? (
            censoredWords.map((word: any) => (
              <li key={word.id || word.uuid || word.word}>
                <span className="font-medium">{word.word}</span>
                {word.category && (
                  <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">[{word.category}]</span>
                )}
                {word.severity && (
                  <span className="ml-2 text-xs text-red-500">Severity: {word.severity}</span>
                )}
              </li>
            ))
          ) : (
            <li className="text-gray-500 dark:text-gray-400">No censored words yet.</li>
          )}
        </ul>
      </div>
    </Dialog>
  );
}

