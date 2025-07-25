import { AnimatePresence, motion } from "motion/react";
import PanelTitle from "./PanelTitle";

interface DialogProps {
  onCancel?: (args?: any) => any;
  shown: boolean;
  children: Readonly<React.ReactNode>;
  title: string;
  compact?: boolean;
}
export default function Dialog({
  shown,
  onCancel,
  title,
  children,
  compact = false,
}: DialogProps) {
  return (
    <AnimatePresence>
      {shown && (
        <motion.div
          onClick={() => {
            onCancel?.();
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed h-full w-full z-[99] top-0 left-0 bg-black/50 flex items-center justify-center"
        >
          <motion.div
            onClick={(e) => {
              e.stopPropagation();
            }}
            initial={{ translateY: 80, opacity: 0 }}
            animate={{ translateY: 0, opacity: 1 }}
            exit={{ translateY: 80, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`bg-white dark:bg-slate-800 text-black dark:text-white p-4 flex-col flex gap-4 ${
              compact ? "" : "w-200"
            } rounded-2xl border border-gray-300 dark:border-slate-700 shadow-md transition-colors duration-300`}
          >
            <PanelTitle>{title}</PanelTitle>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
