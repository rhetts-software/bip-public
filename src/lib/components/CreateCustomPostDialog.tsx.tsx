"use client";

import { AnimatePresence, motion } from "motion/react";
import PanelTitle from "./PanelTitle";
import { useActionState, useEffect } from "react";
import { addCustomForumPost, addForumPost } from "../modules/dal";
import PendingSubmitFormButton from "./PendingSubmitFormButton";
import Dialog from "./Dialog";

interface TreeifiedError {
  _errors: string[];
}

interface FormErrorState {
  errors?: {
    title?: TreeifiedError;
    content?: TreeifiedError;
  };
  posted?: any;
  error?: string;
}

interface WritePostDialogProps {
  shown?: boolean;
  onCancel?: () => any;
  onPost?: (post: any) => any;
}

export default function CreateCustomPostDialog({
  shown = false,
  onCancel,
  onPost,
}: WritePostDialogProps) {
  const [state, action, pending] = useActionState(
    addCustomForumPost,
    undefined
  );

  useEffect(() => {
    if (state?.posted) {
      onPost?.(state.posted);
    }
  }, [state]);

  const baseInputClass =
    "bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700/50 rounded-xl px-6 py-4 text-gray-800 dark:text-white";

  return (
    <Dialog shown={shown} onCancel={onCancel} title={"Create post"}>
      {" "}
      <form action={action} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1  ">
          <input
            name="createdAt"
            id="createdAt"
            type="datetime-local"
            className={`${baseInputClass} `}
          ></input>
          {state?.errors?.title?._errors?.[0] && (
            <p className="text-sm text-red-500">
              {state.errors.title._errors[0]}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <input
            id="title"
            name="title"
            placeholder="Title"
            className={`${baseInputClass} text-2xl`}
          />
          {state?.errors?.title?._errors?.[0] && (
            <p className="text-sm text-red-500">
              {state.errors.title._errors[0]}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <textarea
            id="content"
            name="content"
            placeholder="Discussion"
            className={`${baseInputClass} resize-none h-64 text-lg`}
          />
          {state?.errors?.content?._errors?.[0] && (
            <p className="text-sm text-red-500">
              {state.errors.content._errors[0]}
            </p>
          )}
        </div>

        <div className="w-full flex gap-2 justify-end pt-2">
          <button
            type="reset"
            onClick={() => {
              onCancel?.();
            }}
            className="dark:border-slate-500 hover:bg-slate-500 dark:hover:bg-slate-600 dark:bg-slate-700 bg-slate-400 text-white border-slate-600  dark:text-white  px-3 py-2 rounded-lg border  transition-all duration-200"
            disabled={pending}
          >
            Discard
          </button>
          <button
            disabled={pending}
            type="submit"
            className="ark:border-brand-green-400 hover:bg-brand-blue-600 dark:hover:bg-brand-green-500 dark:bg-brand-green-600 bg-brand-blue-500 border-brand-blue-700 text-white   dark:text-white px-3 py-2 rounded-lg border flex items-center gap-2 transition-all duration-200"
          >
            <PendingSubmitFormButton
              pending={pending}
              text="Post"
              loadingText="Posting"
            />
          </button>
        </div>
      </form>
    </Dialog>
  );
}
