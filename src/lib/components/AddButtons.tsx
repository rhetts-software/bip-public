"use client";

interface AddButtonProps {
  onAdd: () => void;
}

export default function AddButton({ onAdd }: AddButtonProps) {
  return (
    <div className="flex items-center justify-center">
      <button
        onClick={onAdd}
        className="transition-all h-full duration-300 dark:bg-brand-green-600 cursor-pointer bg-brand-blue-500 text-white border-brand-blue-700 dark:text-white px-4 rounded-lg font-bold border dark:border-brand-green-400 hover:bg-brand-blue-600 dark:hover:bg-brand-green-500"
      >
        Add
      </button>
    </div>
  );
}
