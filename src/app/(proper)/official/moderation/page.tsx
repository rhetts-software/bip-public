"use client";
import { useEffect, useMemo, useState } from "react";
import PanelTitle from "@/lib/components/PanelTitle";
import { getAudit, getReports } from "@/lib/modules/dal";
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
  TbFlag,
} from "react-icons/tb";
import Loading from "../../loading";
import AddButtons from "@/lib/components/ViewAddButtons";
import ManageCensored from "@/lib/components/ManageCensored";

export default function AuditPage() {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [addDialogShown, setAddDialogShown] = useState(false);
  const [manageCensoredShown, setManageCensoredShown] = useState(false);

  useEffect(() => {
    getReports().then((result) => {
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
        item.post.title.toLowerCase().includes(searchTerm.toLowerCase());

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
      spam: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
    };
    return colors[category.toLowerCase()] || colors.default;
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="w-full h-full p-6">
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2 mb-4">
            <TbFlag className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            <PanelTitle>User Reports</PanelTitle>
          </div>
          <div className="flex w-full dark:bg-slate-900 border-b dark:border-slate-800 p-4 justify-between items-center gap-x-4">
            <PanelTitle>FAQs</PanelTitle>
            <button
              type="button"
              onClick={() => setManageCensoredShown(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Manage Censored Words
            </button>
          </div>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Manage and resolve user reports
          </p>

          {/* Search and Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <TbSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by user name or action..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex gap-2">
              <div className="relative">
                <TbCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="relative">
                <TbFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="pl-10 pr-8 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none min-w-[120px]"
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {(searchTerm || dateFilter || categoryFilter) && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setDateFilter("");
                  setCategoryFilter("");
                }}
                className="px-4 py-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        <div className="p-6">
          {/* Results count */}
          <div className="mb-4 text-sm text-slate-600 dark:text-slate-400">
            Showing {filteredData.length} of {data.length} entries
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
                  className="group relative bg-slate-50 dark:bg-slate-800/30 rounded-lg p-4 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors border border-slate-200 dark:border-slate-700"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center">
                        <TbClock className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                      </div>
                      {index < filteredData.length - 1 && (
                        <div className="w-px h-8 bg-slate-200 dark:bg-slate-700 mt-2" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-2">
                            <span className="font-medium">{date}</span>
                            <span>at</span>
                            <span>{time}</span>
                          </div>

                          <div className="flex item-center text-slate-900 dark:text-white">
                            <span className="inline-flex items-center gap-1.5 font-medium">
                              <TbUser className="w-4 h-4" />
                              {userName}
                            </span>
                            <span className="text-slate-600 dark:text-slate-300 ml-2">
                              reported post
                            </span>
                            <span className="ml-1">
                              <Link
                                href={`/app/posts/${item.post.id}`}
                                className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline transition-colors"
                              >
                                {item.post.title}
                                <TbExternalLink className="w-3 h-3" />
                              </Link>
                            </span>
                            <span className="ml-1">
                              for reason: "{item.reason}"
                            </span>
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

          {filteredData.length === 0 && data.length > 0 && (
            <div className="text-center py-12">
              <TbSearch className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-500 dark:text-slate-400 mb-2">
                No entries match your filters
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setDateFilter("");
                  setCategoryFilter("");
                }}
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}

          {data.length === 0 && (
            <div className="text-center py-12">
              <TbFileText className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-500 dark:text-slate-400">
                No reports found
              </p>
            </div>
          )}
        </div>
      </div>
      <ManageCensored
        shown={manageCensoredShown}
        onCancel={() => setManageCensoredShown(false)}
      />
    </div>
  );
}
