import { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";

const options = [
  { value: "all", label: "All Posts" },
  { value: "today", label: "Today" },
  { value: "week", label: "This Week" },
  { value: "month", label: "This Month" },
];

export function HomeSearchBarDropdown ({ value, onChange }: { value: string, onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative min-w-[160px]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center bg-white/10 dark:bg-black/20 backdrop-blur-lg border border-white/20 dark:border-white/10 rounded-2xl px-6 py-3 text-gray-800 dark:text-white shadow-lg hover:shadow-xl transition duration-300 focus:outline-none focus:ring-2 focus:ring-white/30 dark:focus:ring-white/20"
      >
        {options.find(o => o.value === value)?.label || "Select"}
        <FaChevronDown className="ml-2 text-gray-600 dark:text-gray-400" />
      </button>

      {open && (
        <ul className="absolute z-50 w-full mt-2 bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-white/20 dark:border-white/10 overflow-hidden">
          {options.map(opt => (
            <li
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={`px-4 py-2 text-gray-800 dark:text-white hover:bg-emerald-100 dark:hover:bg-emerald-800 cursor-pointer ${
                value === opt.value ? "bg-emerald-100 dark:bg-emerald-800" : ""
              }`}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
