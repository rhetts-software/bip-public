"use client";
import { useEffect, useMemo, useState } from "react";
import PanelTitle from "@/lib/components/PanelTitle";
import { getAudit } from "@/lib/modules/dal";
import {
  auditObjectToHref,
  auditObjectToUserFriendlyString,
} from "@/lib/modules/utils";
import Link from "next/link";
import {
  TbClock,
  TbUser,
  TbExternalLink,
  TbFileText,
  TbSearch,
  TbCalendar,
  TbFilter,
} from "react-icons/tb";
import Loading from "@/app/(proper)/loading";

export default function AuditTrailPrint() {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  useEffect(() => {
    getAudit().then((result) => {
      setData(result);
      setIsLoading(false);
    });
  }, []);

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(data.map((item) => item.category))];
    return uniqueCategories.sort();
  }, [data]);

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const userName = [
        item.profile.first_name,
        item.profile.middle_name,
        item.profile.last_name,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        searchTerm === "" ||
        userName.includes(searchTerm.toLowerCase()) ||
        item.action.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDate =
        dateFilter === "" ||
        new Date(item.created_at).toDateString() ===
          new Date(dateFilter).toDateString();

      const matchesCategory =
        categoryFilter === "" ||
        item.category.toLowerCase() === categoryFilter.toLowerCase();

      return matchesSearch && matchesDate && matchesCategory;
    });
  }, [data, searchTerm, dateFilter, categoryFilter]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      time: date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      comment: "bg-green-100 text-green-800 ",
      post: "bg-blue-100 text-blue-800 ",
      system: "bg-red-100 text-red-800",
      report: "bg-amber-100 text-amber-800",
      placeholder2: "bg-slate-100 text-slate-700",
    };
    return colors[category.toLowerCase()] || colors.default;
  };

  return (
    <div className="w-full h-full p-6 text-black">
      <div className="bg-white  rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">Audit Trail</span>
          </div>

          <span className="opacity-80">
            Generated at{" "}
            {new Date().toLocaleTimeString("en-US", {
              month: "long",
              day: "2-digit",
              year: "numeric",
            })}
          </span>
          {/* Search and Filter Controls */}
        </div>
        <div className="p-6">
          {/* Results count */}
          <div className="mb-4 text-sm text-slate-600 ">
            {data.length} entries
            {(searchTerm || dateFilter || categoryFilter) && " (filtered)"}
          </div>
          <div className="space-y-4">
            {filteredData.map((item, index) => {
              const { date, time } = formatDate(item.created_at);
              const userName = [
                item.profile.first_name,
                item.profile.middle_name,
                item.profile.last_name,
              ]
                .filter(Boolean)
                .join(" ");
              return (
                <div
                  key={item.id}
                  className="group relative bg-slate-50  rounded-lg p-4 hover:bg-slate-100 transition-colors border border-slate-200 "
                >
                  <div className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      {index < filteredData.length - 1 && (
                        <div className="w-px h-8 bg-slate-200" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 flex gap-4 min-w-0">
                          <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                            <span className="font-medium">{date}</span>
                            <span>at</span>
                            <span>{time}</span>
                          </div>
                          <div className="text-slate-900">
                            <span className="inline-flex items-center gap-1.5 font-medium">
                              <TbUser className="w-4 h-4" />
                              {userName}
                            </span>
                            <span className="text-slate-600 ml-2">
                              {item.action}
                            </span>
                            {item.object && (
                              <span className="ml-1">
                                <Link
                                  href={auditObjectToHref(item.object)}
                                  className="inline-flex items-center gap-1 text-blue-600  transition-colors"
                                >
                                  {auditObjectToUserFriendlyString(item.object)}
                                  <TbExternalLink className="w-3 h-3" />
                                </Link>
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex-shrink-0">
                          <span
                            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                              item.category
                            )}`}
                          >
                            {item.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
