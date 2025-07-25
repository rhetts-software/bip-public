"use client";
import { useState, useEffect } from "react";
import { MdRefresh } from "react-icons/md";
import { TbFileText, TbSearch, TbFilter } from "react-icons/tb";
import { motion, AnimatePresence } from "framer-motion";
import PanelTitle from "@/lib/components/PanelTitle";
import Loading from "@/app/(proper)/loading";
import DocumentList from "@/lib/components/DocumentList";
import { getDocuments } from "@/lib/modules/dal";


const ITEMS_PER_PAGE = 10;
const bucket = "documents";

export default function DocumentsPage() {
  const [uploadedDocs, setUploadedDocs] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [rotation, setRotation] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchDocuments = async () => {
    getDocuments().then((docs) => {
      setUploadedDocs(docs);
      setIsLoading(false);
    });
  };

  const handleReload = async () => {
    const newRotation = rotation + 360;
    setRotation(newRotation);

    await fetchDocuments();
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const filteredDocs = uploadedDocs.filter((doc) =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
const totalPages = Math.ceil(filteredDocs.length / ITEMS_PER_PAGE);
  const paginatedDocs = filteredDocs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  useEffect(() => {
    setCurrentPage(1); // reset to page 1 when search changes
  }, [searchQuery]);

  if (isLoading) return <Loading />;

  return (
    <div className="w-full min-h-full p-6 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
      <div className="p-6 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2 mb-4">
          <TbFileText className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          <PanelTitle>Official Public Documents</PanelTitle>
          <AnimatePresence>
            <motion.button
              onClick={handleReload}
              animate={{ rotate: rotation }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="ml-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <MdRefresh size={20} />
            </motion.button>
          </AnimatePresence>
        </div>

        <p className="text-slate-600 dark:text-slate-400 mb-4">
          Access and manage official public documents
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <TbSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="px-4 py-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Clear Search
            </button>
          )}
        </div>
      </div>
      {totalPages > 1 && (
          <div className="flex justify-center mt-6 space-x-4">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-sm rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-slate-600 dark:text-slate-400 pt-2 text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-sm rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      <div className="p-6">
        <div className="mb-4 text-sm text-slate-600 dark:text-slate-400">
          Showing {paginatedDocs.length} of {filteredDocs.length} documents
          
          {searchQuery && " (filtered)"}
        </div>
          
        <DocumentList documents={paginatedDocs} />

        {filteredDocs.length === 0 && uploadedDocs.length > 0 && (
          <div className="text-center py-12">
            <TbSearch className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-500 dark:text-slate-400 mb-2">
              No documents match your search
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Clear search
            </button>
          </div>
        )}

        {uploadedDocs.length === 0 && (
          <div className="text-center py-12">
            <TbFileText className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-500 dark:text-slate-400">
              No documents found
            </p>
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center mt-6 space-x-4">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-sm rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-slate-600 dark:text-slate-400 pt-2 text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-sm rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}