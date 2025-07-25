"use client";
import { TbDownload } from "react-icons/tb";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { decodeSafeBase64, dateToUserFriendlyString } from "@/lib/modules/utils";
import { getDocuments } from "@/lib/modules/dal";
import Loading from "@/app/(proper)/loading";

export default function ViewDocumentPage() {
  const params = useParams();
  const documentId = params?.document_id as string;

  const [document, setDocument] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [downloading, setDownloading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchDocument() {
      try {
        const decodedFilename = decodeSafeBase64(documentId);
        const docs = await getDocuments();
        const matched = docs.find((doc) => doc.name === decodedFilename);

        if (matched) {
          setDocument(matched);
        } else {
          setError("Document not found.");
        }
      } catch (err) {
        console.error("Error fetching document:", err);
        setError("Invalid or missing document.");
      }
    }

    if (documentId) {
      fetchDocument();
    }
  }, [documentId]);

  const handleDownload = async () => {
    if (!document) return;
    setDownloading(true);
    try {
      const response = await fetch(document.file_url);
      if (!response.ok) throw new Error("Failed to download file.");
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = document.display_name || document.name;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(blobUrl);
    } catch (err) {
      alert("Failed to download file.");
      console.error(err);
    } finally {
      setDownloading(false);
    }
  };

  if (error || !document) {
    return <Loading />;
  }

  return (
    <div className="p-6 text-gray-900 dark:text-white flex flex-col md:flex-row gap-6 min-h-screen bg-gray-100 dark:bg-gray-900 relative">
      <div className="flex-1">
        <h1 className="text-2xl font-semibold mb-4">Document Preview</h1>
        {document.name?.endsWith(".pdf") ? (
          <iframe
            src={document.file_url + "#toolbar=0"}
            className="w-full h-[80vh] rounded-lg shadow-lg border border-gray-300 dark:border-gray-700 bg-white"
            title="PDF Preview"
          />
        ) : document.name?.match(/\.(jpg|jpeg|png|gif|bmp|webp)$/i) ? (
          <img
            src={document.file_url}
            alt="Image Preview"
            className="w-full max-h-[80vh] object-contain rounded-lg shadow-lg border border-gray-300 dark:border-gray-700 bg-white"
          />
        ) : (
          <div className="w-full h-[80vh] flex items-center justify-center border border-dashed border-gray-400 dark:border-gray-600 rounded-lg text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-800">
            <span>📁 Cannot preview this file type.</span>
          </div>
        )}
      </div>

      <div className="w-full md:w-1/3 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-300 dark:border-gray-700 flex flex-col gap-4">
        <h2 className="text-xl font-bold mb-4 pb-2 border-b border-gray-300 dark:border-gray-600 w-full">📄 Document Info</h2>
        <div className="space-y-3 text-sm">
          <div>
            <span className="text-gray-500 dark:text-gray-400">Filename:</span>
            <p className="text-gray-900 dark:text-white font-medium break-all">{document.display_name || document.name}</p>
          </div>
          <div>
            <span className="text-gray-500 dark:text-gray-400">Category:</span>
            <p className="text-gray-900 dark:text-white">{document.category || "N/A"}</p>
          </div>
          <div>
            <span className="text-gray-500 dark:text-gray-400">Uploaded:</span>
            <p className="text-gray-900 dark:text-white">
              {document.uploaded_at ? dateToUserFriendlyString(new Date(document.uploaded_at)) : "N/A"}
            </p>
          </div>
          <div>
            <span className="text-gray-500 dark:text-gray-400">Size:</span>
            <p className="text-gray-900 dark:text-white">{(document.size / 1024).toFixed(2)} KB</p>
          </div>
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 mt-2 text-sm font-medium text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/20 hover:bg-green-200 dark:hover:bg-green-900/30 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <TbDownload className="w-4 h-4" />
            {downloading ? "Downloading..." : "Download"}
          </button>
        </div>
      </div>
    </div>
  );
}
