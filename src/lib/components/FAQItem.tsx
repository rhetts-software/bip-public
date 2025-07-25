// FAQItem.tsx
"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { TbChevronDown } from "react-icons/tb";

interface FAQItemProps {
  item: {
    question: string;
    answer: string;
  };
  isLast: boolean;
  searchQuery?: string;
}

const highlightText = (text: string, query: string) => {
  if (!query) return text;

  const regex = new RegExp(`(${query})`, "gi");
  const parts = text.split(regex);

  return parts.map((part, index) =>
    regex.test(part) ? (
      <mark
        key={index}
        className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded"
      >
        {part}
      </mark>
    ) : (
      part
    )
  );
};

export default function FAQItem({ item, isLast, searchQuery }: FAQItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`${
        !isLast ? "border-b border-slate-200 dark:border-slate-700" : ""
      }`}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-100 dark:hover:bg-slate-700  transition-colors duration-200"
      >
        <h4 className="text-lg font-medium text-slate-800 dark:text-white pr-4">
          {highlightText(item.question, searchQuery || "")}
        </h4>
        <TbChevronDown
          size={18}
          className={`text-slate-400 transition-transform duration-200 flex-shrink-0 ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6">
              <div className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {highlightText(item.answer, searchQuery || "")}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
