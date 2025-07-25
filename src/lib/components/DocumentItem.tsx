"use client";
import { useState } from "react";
import supabase from "@/lib/modules/supabase.client";
import Link from "next/link";
import { TbFile, TbDownload, TbEye, TbCalendar } from "react-icons/tb";
import { encodeSafeBase64 } from "../modules/utils";

interface DocumentItemProps {
  doc: {
    id: string;
    name: string;
    file_url: string;
    display_name: string;
    bucket: string;
    uploaded_at: string;
  };
}

export default function DocumentItem({ doc }: DocumentItemProps) {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    const { data, error } = await supabase.storage.from(doc.bucket).download(doc.file_url);

    if (error || !data) {
      alert("Failed to download file.");
      console.error(error);
      setDownloading(false);
      return;
    }

    const blobUrl = URL.createObjectURL(data);
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = doc.name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(blobUrl);
    setDownloading(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="group relative bg-slate-50 dark:bg-slate-800/30 rounded-lg p-4 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors border border-slate-200 dark:border-slate-700">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
            <TbFile className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-2">
                <TbCalendar className="w-4 h-4" />
                <span>Uploaded {formatDate(doc.uploaded_at)}</span>
              </div>

              <div className="text-slate-900 dark:text-white mb-3">
                <h3 className="font-medium text-base truncate">
                  {doc.display_name || doc.name}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 truncate">
                  {doc.name}
                </p>
              </div>

              <div className="flex gap-2">
                <Link
                  href={{
                    pathname: `/app/documents/${encodeSafeBase64(doc.name)}`,
                    query: {
                      url: encodeURIComponent(doc.file_url),
                      metadata: JSON.stringify({
                        created_at: doc.uploaded_at,
                        last_modified: doc.uploaded_at,
                      }),
                    },
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                >
                  <TbEye className="w-4 h-4" />
                  View
                </Link>

                <button
                  onClick={handleDownload}
                  disabled={downloading}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <TbDownload className="w-4 h-4" />
                  {downloading ? "Downloading..." : "Download"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}