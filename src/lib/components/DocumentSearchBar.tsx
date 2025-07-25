"use client";
import { useState, useEffect } from "react";
import supabase from "@/lib/modules/supabase.client";
import { TbSearch } from "react-icons/tb";

interface DocumentSearchBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export default function DocumentSearchBar({ searchQuery, onSearchChange }: DocumentSearchBarProps) {
  return (
    <div className="relative">
      <TbSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
      <input
        type="text"
        placeholder="Search documents..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );
}