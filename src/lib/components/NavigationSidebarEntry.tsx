import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { IconType } from "react-icons";
import ResolvableIcon from "./ResolvableIcon";

interface NavigationSidebarEntryProps {
  showText?: boolean;
  icon: string;
  text: string;
  href: string;
  currentPath: string;
}
export default function NavigationSidebarEntry({
  icon,
  showText,
  text,
  href,
  currentPath,
}: NavigationSidebarEntryProps) {
  return (
    <Link
      className={`h-12 ${
        showText ? "w-full pr-4" : "w-min "
      } flex gap-4 box-border p-2  items-center justify-start ${
        currentPath == href ? "bg-black/15" : ""
      } hover:bg-black/15 transition-all duration-300 rounded-xl`}
      href={href}
    >
      <div className="w-8 h-8 flex items-center justify-center">
        <ResolvableIcon icon={icon} size={24}></ResolvableIcon>
      </div>
      <AnimatePresence>
        {showText && (
          <motion.span
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
          >
            {text}
          </motion.span>
        )}
      </AnimatePresence>
    </Link>
  );
}
