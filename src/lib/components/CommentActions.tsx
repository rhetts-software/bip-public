import { AnimatePresence, motion } from "motion/react";
import { useActionState, useEffect, useRef, useState } from "react";
import { TbThumbUp, TbThumbDown, TbMessage, TbFlag } from "react-icons/tb";
import PendingSubmitFormButton from "./PendingSubmitFormButton";
import {
  getUserCommentReaction,
  postReply,
  reactToComment,
  removeCommentReaction,
} from "../modules/dal";
import Reaction from "./Reaction";
interface CommentActionsProps {
  id: string;
  postId: string;
  initialLikes: number;
  initialDislikes: number;
  onReply?: () => any;
}

export default function CommentActions({
  postId,
  id,
  onReply,
  initialDislikes,
  initialLikes,
}: CommentActionsProps) {
  const [replyAreaShown, setReplyAreaShown] = useState(false);
  const textArea = useRef<HTMLTextAreaElement>(null);
  const [state, action, pending] = useActionState(postReply, undefined);

  useEffect(() => {
    if (state?.success) {
      onReply?.();
      setReplyAreaShown(false);
    }
  }, [state]);
  return (
    <div className="flex flex-col gap-2 px-10 w-full">
      <div className="flex items-center gap-2">
        <Reaction
          parentId={id}
          initialLikes={initialLikes ?? 0}
          initialDislikes={initialDislikes ?? 0}
          react={reactToComment}
          removeReaction={removeCommentReaction}
          fetchInitialReaction={getUserCommentReaction}
        ></Reaction>
        <div className="flex *:flex *:gap-2 *:text-lg *:hover:dark:text-brand-green-400 *:hover:underline *:items-center gap-4 *:cursor-pointer">
          <button
            onClick={() => {
              setReplyAreaShown(!replyAreaShown);
            }}
          >
            <TbMessage size={24}></TbMessage> Reply
          </button>
        </div>
      </div>

      <AnimatePresence>
        {replyAreaShown && (
          <motion.div
            className="flex w-full"
            initial={{ opacity: 0, translateY: -10 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: -10 }}
          >
            <form action={action} className="flex flex-col gap-2 w-full">
              <input type="hidden" name="commentId" id="commentId" value={id} />
              <input type="hidden" name="postId" id="postId" value={postId} />
              <textarea
                name="content"
                id="content"
                ref={textArea}
                className="w-full text-lg resize-none h-24 px-4 py-2 rounded-2xl border 
                          bg-white text-black placeholder-gray-500 
                          border-gray-300 
                          dark:bg-slate-950/50 dark:text-white 
                          dark:placeholder-gray-400 dark:border-slate-700 
                          focus:outline-none focus:ring-2 focus:ring-brand-blue-500"
                placeholder="Reply to this comment"
              ></textarea>
              <div className="w-full *:cursor-pointer flex justify-end gap-4 px-4">
                <button
                  onClick={() => {
                    setReplyAreaShown(false);
                    textArea.current!.value = "";
                  }}
                  type="reset"
                  className="transition-all duration-300 dark:bg-slate-700 cursor-pointer bg-slate-400 text-white border-slate-600  dark:text-white px-4 py-2 rounded-lg font-bold border dark:border-slate-500 hover:bg-slate-500 dark:hover:bg-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={pending}
                  className="transition-all flex items-center justify-center duration-300 dark:bg-brand-green-600 cursor-pointer bg-brand-blue-500 text-white border-brand-blue-700  dark:text-white px-4 py-2 rounded-lg font-bold border dark:border-brand-green-400 hover:bg-brand-blue-600 dark:hover:bg-brand-green-500"
                >
                  <PendingSubmitFormButton
                    pending={pending}
                    text={"Reply"}
                    loadingText="Replying"
                  ></PendingSubmitFormButton>
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
