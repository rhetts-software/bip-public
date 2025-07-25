// FAQSearchBar.tsx
"use client";
import { useState } from "react";
import { TbSearch, TbX } from "react-icons/tb";

interface FAQSearchBarProps {
  onSearch?: (query: string) => void;
}

export default function FAQSearchBar({ onSearch }: FAQSearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    onSearch?.(value);
  };

  const clearSearch = () => {
    setSearchQuery("");
    onSearch?.("");
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <TbSearch 
          size={20} 
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500" 
        />
        <input
          type="text"
          placeholder="Search FAQs..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full pl-12 pr-12 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-blue-500 dark:focus:ring-brand-green-500 transition-all duration-300"
        />
        {searchQuery && (
          <button
            onClick={clearSearch}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 transition-colors duration-200"
          >
            <TbX size={20} />
          </button>
        )}
      </div>
    </div>
  );
}