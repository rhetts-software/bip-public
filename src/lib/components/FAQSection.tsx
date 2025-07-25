"use client";
import { useEffect, useMemo, useState } from "react";
import FAQCategory from "./FAQCategory";
import { getFAQs, checkUserRole } from "../modules/dal";
import { TbMessage, TbPhone } from "react-icons/tb";

interface FAQSectionProps {
  searchQuery: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategoryData {
  id: number;
  name: string;
  icon: string;
  entries: FAQItem[];
}

export default function FAQSection({ searchQuery }: FAQSectionProps) {
  const [faqData, setFaqData] = useState<FAQCategoryData[]>([]);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  useEffect(() => {
    const fetchFAQs = async () => {
      const grouped = await getFAQs();
      setFaqData(grouped ?? []);
    };

    fetchFAQs();
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="space-y-6">
        {faqData.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-slate-600 dark:text-slate-400 mb-2">
              No results found
            </h3>
            <p className="text-slate-500 dark:text-slate-500">
              Try adjusting your search terms or browse our categories below.
            </p>
          </div>
        ) : (
          faqData.map((category) => (
            <FAQCategory
              key={category.id}
              category={category}
              isActive={activeCategory === category.id}
              onToggle={() =>
                setActiveCategory(
                  activeCategory === category.id ? null : category.id
                )
              }
              searchQuery={searchQuery}
            />
          ))
        )}
      </div>

      {/* Contact Section */}
      <div className="mt-16 p-8 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">
            Still need help?
          </h3>
          <p className="text-slate-600 dark:text-slate-300 mb-6">
            Can't find what you're looking for? Our team is here to assist you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.facebook.com/share/1ZNut86AfQ/"
              className="border dark:border-brand-green-400 border-brand-blue-600  inline-flex gap-2 text-lg items-center justify-center px-6 py-3 bg-brand-blue-500 dark:bg-brand-green-600 text-white font-semibold rounded-xl hover:bg-brand-blue-600 dark:hover:bg-brand-green-500 transition-colors duration-300"
            >
              <TbPhone size={24}></TbPhone> Call Us
            </a>
            <a
              href="https://www.facebook.com/share/1ZNut86AfQ/"
              className="border dark:border-slate-500 border-slate-400 inline-flex gap-2 text-lg items-center justify-center px-6 py-3 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white font-semibold rounded-xl hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors duration-300"
            >
              <TbMessage size={24}></TbMessage> Contact Form
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
