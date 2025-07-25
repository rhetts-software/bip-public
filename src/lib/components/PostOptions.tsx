"use client";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { TbDots, TbEdit, TbEye, TbFlag, TbTrash } from "react-icons/tb";
import EditPostDialog from "./EditPostDialog";
import ReportPostDialog from "./ReportPostDialog";
import { deletePost } from "../modules/dal";
import { useRouter } from "next/navigation";
interface PostOptionsProps {
  viewLink: string;
  isViewOptionVisible?: boolean;
  isOwnPost?: boolean;
  onDeleted?: () => any;
  onEdited?: (edited: any) => any;
  onReported?: () => any;
  reloadAfterEdit?: boolean;
  reloadAfterDelete?: boolean;
  isPrivileged?: boolean;
  post: { title: string; content: string; id: string };
}
export default function PostOptions({
  isViewOptionVisible = true,
  isOwnPost = false,
  isPrivileged = false,
  viewLink,
  onDeleted,
  onEdited,
  post,
  reloadAfterEdit = false,
  reloadAfterDelete = false,
  onReported,
}: PostOptionsProps) {
  const [shown, setShown] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [editDialogShown, setEditDialogShown] = useState(false);
  const [reportDialogShown, setReportDialogShown] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (editDialogShown) {
      setEditDialogShown(false);
    }
  }, [reportDialogShown]);
  useEffect(() => {
    if (reportDialogShown) {
      setReportDialogShown(false);
    }
  }, [editDialogShown]);
  return (
    <div
      onBlur={() => {
        setTimeout(() => {
          setShown(false);
        }, 100);
      }}
      className="flex flex-col relative"
    >
      <EditPostDialog
        shown={editDialogShown}
        title={post.title}
        postId={post.id}
        content={post.content}
        onCancel={() => {
          setEditDialogShown(false);
        }}
        onEdit={(posted) => {
          setEditDialogShown(false);
          onEdited?.(posted);
          if (reloadAfterEdit) {
            window.location.reload();
          }
        }}
      ></EditPostDialog>
      <ReportPostDialog
        shown={reportDialogShown}
        onCancel={() => {
          setReportDialogShown(false);
        }}
        onReported={() => {
          setReportDialogShown(false);
        }}
        postId={post.id}
      ></ReportPostDialog>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setShown(!shown);
        }}
        className="hover:bg-black/10 rounded-full p-2 duration-100 transition-all cursor-pointer"
      >
        <TbDots size={24}></TbDots>
      </button>
      <AnimatePresence>
        {shown && (
          <motion.div
            initial={{ translateY: -20, opacity: 0 }}
            animate={{ translateY: 0, opacity: 1 }}
            exit={{ translateY: -20, opacity: 0 }}
            className="absolute top-14 right-0 bg-white  dark:bg-slate-800 border dark:border-slate-700 border-neutral-400 rounded-[0.8rem] shadow-lg p-2 flex items-start justify-center flex-col gap-2 z-50"
          >
            {isViewOptionVisible && (
              <Link
                href={viewLink}
                className="hover:bg-black/3 dark:hover:bg-white/3 w-full cursor-pointer pr-3 flex items-center  gap-2 text-nowrap rounded-lg p-2 transition-all duration-100"
              >
                <TbEye size={18}></TbEye>
                <span className="text-lg">View</span>
              </Link>
            )}
            {(isOwnPost || isPrivileged) && (
              <div className="flex-col flex gap-2">
                {isOwnPost && (
                  <button
                    onClick={() => {
                      setEditDialogShown(true);
                    }}
                    className="hover:bg-black/3 dark:hover:bg-white/3 w-full cursor-pointer pr-3 flex items-center  gap-2 text-nowrap rounded-lg p-2 transition-all duration-100"
                  >
                    <TbEdit size={18}></TbEdit>
                    <span className="text-lg">Edit</span>
                  </button>
                )}
                <button
                  className="dark:hover:bg-red-800 hover:bg-red-500 text-white cursor-pointer w-full bg-red-600 dark:bg-red-900 pr-3 flex items-center justify-center gap-2 text-nowrap rounded-lg p-2 transition-all duration-100"
                  onClick={async () => {
                    setDeleting(true);
                    await deletePost(post.id);
                    onDeleted?.();
                    if (reloadAfterDelete) {
                      window.location.reload();
                    }
                  }}
                >
                  <TbTrash size={18}></TbTrash>
                  <span className="text-lg">Delete</span>
                </button>
              </div>
            )}
            {!isOwnPost && (
              <button
                onClick={() => {
                  setReportDialogShown(true);
                }}
                className="hover:bg-black/3 dark:hover:bg-white/3 w-full cursor-pointer pr-3 flex items-center  gap-2 text-nowrap rounded-lg p-2 transition-all duration-100"
              >
                <TbFlag size={18}></TbFlag>
                <span className="text-lg">Report</span>
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
