"use client";

import { AnimatePresence, motion } from "motion/react";
import { useActionState, useEffect, useRef, useState } from "react";
import { postComment } from "../modules/dal";
import PendingSubmitFormButton from "./PendingSubmitFormButton";
interface PostCommentAreaProps {
  postId: string;
  onPost?: (content: {
    id: string;
    content: string;
    created_at: string;
    profile: {
      first_name: string;
      middle_name: string;
      last_name: string;
      avatar: string | null;
    };
  }) => any;
}
export default function PostCommentArea({
  onPost,
  postId,
}: PostCommentAreaProps) {
  const [focused, setFocus] = useState(false);
  const [state, action, pending] = useActionState(postComment, undefined);
  const textArea = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (state?.posted) {
      setFocus(false);
      onPost?.(state?.posted);
    }
  }, [state]);
  return (
    <div className="relative flex flex-col w-full">
      <form name="postCommentForm" id="postCommentForm" action={action}>
        <textarea
          id="content"
          name="content"
          disabled={pending}
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          maxLength={500}
          ref={textArea}
          onFocus={() => {
            console.log("focused");
            setFocus(true);
          }}
          onBlur={(event) => {
            if (event.target.textLength > 0) {
              return;
            }
            setFocus(false);
          }}
          placeholder="Share your thoughts on this post"
          className={`transition-all duration-200 ${
            focused ? "h-32" : "h-14"
          } px-6 py-3 resize-none dark:text-white/70 text-lg dark:bg-slate-950/50 rounded-4xl dark:border-slate-700 border w-full `}
        ></textarea>
        <input type="hidden" value={postId} name="postId"></input>
        <div className="flex justify-between h-18">
          <div className="text-nowrap">
            {state?.errors?.properties?.content?.errors && (
              <span className="text-red-500 text-sm px-6">
                {state.errors.properties.content.errors.join(", ")}
              </span>
            )}
          </div>

          <AnimatePresence>
            {focused && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="w-full flex justify-end p-4 gap-4"
              >
                <button
                  onClick={() => {
                    setFocus(false);
                    textArea.current!.value = "";
                  }}
                  type="reset"
                  className="transition-all duration-300 dark:bg-slate-700 cursor-pointer bg-slate-400 text-white border-slate-600  dark:text-white px-4 rounded-lg font-bold border dark:border-slate-500 hover:bg-slate-500 dark:hover:bg-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  form="postCommentForm"
                  className="transition-all flex items-center justify-center duration-300 dark:bg-brand-green-600 cursor-pointer bg-brand-blue-500 text-white border-brand-blue-700  dark:text-white px-4 rounded-lg font-bold border dark:border-brand-green-400 hover:bg-brand-blue-600 dark:hover:bg-brand-green-500"
                >
                  <PendingSubmitFormButton
                    pending={pending}
                    text={"Comment"}
                    loadingText="Commenting"
                  ></PendingSubmitFormButton>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </form>
    </div>
  );
}
