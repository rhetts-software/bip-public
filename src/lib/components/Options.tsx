"use client";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { TbDots, TbEdit, TbEye, TbFlag, TbTrash } from "react-icons/tb";
import EditPostDialog from "./EditPostDialog";
import ReportPostDialog from "./ReportPostDialog";
import { deletePost } from "../modules/dal";
import { useRouter } from "next/navigation";

interface OptionsProps {
  children?: Readonly<React.ReactNode>;
}
export default function Options({ children }: OptionsProps) {
  const [shown, setShown] = useState(false);

  return (
    <div
      onBlur={() => {
        setTimeout(() => {
          setShown(false);
        }, 100);
      }}
      className="flex flex-col relative"
    >
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
            className="absolute z-50 top-14 right-0 bg-white  dark:bg-slate-800 border dark:border-slate-700 border-neutral-400 rounded-[0.8rem] shadow-lg p-2 flex items-start justify-center flex-col gap-2  "
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
