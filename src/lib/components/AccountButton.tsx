"use client";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { TbChevronDown, TbUser } from "react-icons/tb";
import DropdownMenuItem from "./DropdownMenuItem";
import DropdownMenuSignOutButton from "./DropdownMenuSignOutButton";
import Image from "next/image";

export default function AccountButton({
  displayText,
  profileImage,
}: {
  displayText: string;
  profileImage?: string | undefined;
}) {
  const [dropdownShown, toggleDropdownShown] = useState(false);
  return (
    <div
      onBlur={() => {
        setTimeout(() => {
          toggleDropdownShown(false);
        }, 100);
      }}
      className="flex relative justify-end text-nowrap"
    >
      <button
        onClick={() => {
          toggleDropdownShown(!dropdownShown);
        }}
        className="flex items-center gap-2 justify-center cursor-pointer dark:hover:bg-white/15 hover:bg-black/15 px-6 py-3 rounded-2xl dark:text-white"
      >
        <span className="text-lg">Hello, {displayText}</span>
        <div className="aspect-square flex items-center justify-center rounded-full h-fit w-fit overflow-hidden bg-white border">
          <Image
            src={profileImage ? profileImage : "/default_user.svg"}
            width={32}
            height={32}
            alt=""
          ></Image>
        </div>
      </button>
      <AnimatePresence>
        {dropdownShown && (
          <motion.div
            initial={{ opacity: 0, translateY: -20 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: -20 }}
            className=" dark:bg-slate-800 border dark:border-slate-700 gap-2 dark:text-white/80 text-black/80 bg-slate-100 border-slate-400 flex flex-col rounded-2xl  p-2 absolute top-20"
          >
            <DropdownMenuItem
              text="Account"
              href="/app/account"
              icon={<TbUser size={24}></TbUser>}
            ></DropdownMenuItem>

            <div className="w-full border-t border-slate-400 dark:border-slate-700"></div>
            <DropdownMenuSignOutButton></DropdownMenuSignOutButton>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
