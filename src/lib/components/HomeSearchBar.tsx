"use client";
import { useState } from "react";
import { TbSearch, TbX } from "react-icons/tb";

interface HomeSearchBarProps {
  value: string;
  onChange: (val: string) => void;
}

export function HomeSearchBar({ value, onChange }: HomeSearchBarProps) {
  const [focused, setFocused] = useState(false);

  const clearSearch = () => {
    onChange("");
  };

  return (
    <div className="relative w-full max-w-2xl flex-1 min-w-[160px]">
      <div className="relative">
        <TbSearch
          size={20}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Search posts..."
          className={`w-full pl-12 pr-12 py-3 rounded-2xl bg-white/20 dark:bg-black/20 border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-green-500 transition-all duration-300 ${
            focused ? "shadow-md" : ""
          }`}
        />
        {value && (
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
