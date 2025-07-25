// FAQCategory.tsx
"use client";
import { AnimatePresence, motion } from "motion/react";
import { TbChevronDown } from "react-icons/tb";
import ResolvableIcon from "./ResolvableIcon";
import FAQItem from "./FAQItem";

interface FAQCategoryProps {
  category: {
    id: number;
    name: string;
    icon: string;
    entries: Array<{
      question: string;
      answer: string;
    }>;
  };
  isActive: boolean;
  onToggle: () => void;
  searchQuery?: string;
}

export default function FAQCategory({
  category,
  isActive,
  onToggle,
  searchQuery,
}: FAQCategoryProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200"
      >
        <div className="flex items-center gap-4">
          <div className="p-3 bg-brand-blue-100 dark:bg-brand-green-900/30 rounded-xl text-brand-blue-600 dark:text-brand-green-400">
            <ResolvableIcon icon={category.icon} size={24} />
          </div>
          <div className="text-left">
            <h3 className="text-xl font-semibold text-slate-800 dark:text-white">
              {category.name}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {category.entries.length} question
              {category.entries.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
        <TbChevronDown
          size={20}
          className={`text-slate-400 transition-transform duration-200 ${
            isActive ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="overflow-hidden"
          >
            <div className="border-t border-slate-200 dark:border-slate-700">
              {category.entries.map((item, index) => (
                <FAQItem
                  key={index}
                  item={item}
                  isLast={index === category.entries.length - 1}
                  searchQuery={searchQuery}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
