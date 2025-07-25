"use client";
import { useState } from "react";
import FAQSection from "@/lib/components/FAQSection";
import FAQSearchBar from "@/lib/components/FAQSearchBar";

export default function AppHome() {
  const [query, setQuery] = useState("");

  return (
    <div className="flex flex-col items-center justify-start w-full">
      {/* Header Section */}
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="flex flex-col items-center justify-center w-full gap-6 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-slate-800 dark:text-white">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 text-center max-w-2xl">
            Find answers to common questions about barangay services,
            requirements, and procedures.
          </p>

          {/* Search Bar */}
          <FAQSearchBar onSearch={setQuery} />
        </div>
      </div>

      {/* FAQ Content */}
      <div className="w-full max-w-5xl mx-auto px-4 pb-16">
        <FAQSection searchQuery={query} />
      </div>
    </div>
  );
}
