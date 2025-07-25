import { AnimatePresence, motion } from "motion/react";
import supabase from "../modules/supabase.client";
import { TbLogout2 } from "react-icons/tb";

export default function SignOutButton({ showText }: { showText: boolean }) {
  return (
    <button
      className={`h-12 cursor-pointer ${
        showText ? "w-full pr-4" : "w-min "
      } flex gap-4 p-2  items-center justify-start hover:bg-black/15 transition-all duration-300 rounded-xl`}
      onClick={() => {
        supabase.auth.signOut();
      }}
    >
      <div className="w-8 h-8 flex items-center justify-center">
        <TbLogout2 size={24}></TbLogout2>
      </div>{" "}
      <AnimatePresence>
        {showText && (
          <motion.span
            className="text-nowrap"
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
          >
            Sign Out
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
