"use client";
import { useEffect, useState } from "react";
import { TbTrash, TbUser, TbClock, TbRestore, TbTrashX, TbSearch } from "react-icons/tb";
import {
  getDeletedAnnouncements,
  getDeletedPosts,
  permanentlyDeleteAnnouncement,
  permanentlyDeletePost,
  restoreAnnouncement,
  restorePost,
} from "@/lib/modules/dal";
import ForumPostContent from "@/lib/components/ForumPostContent";
import PanelTitle from "@/lib/components/PanelTitle";
import Image from "next/image";

export default function RecyclingBin() {
  const [deletedItems, setDeletedItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalItem, setModalItem] = useState<any | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const [announcements, posts] = await Promise.all([
        getDeletedAnnouncements(),
        getDeletedPosts(),
      ]);
      // Normalize and tag each item
      const normalizedAnnouncements = (announcements || []).map(
        (item: any) => ({
          ...item,
          type: "announcement",
        })
      );
      const normalizedPosts = (posts || []).map((item: any) => ({
        ...item,
        type: "post",
      }));
      // Combine and sort by deleted_at descending
      const combined = [...normalizedAnnouncements, ...normalizedPosts].sort(
        (a, b) =>
          new Date(b.deleted_at).getTime() - new Date(a.deleted_at).getTime()
      );
      setDeletedItems(combined);
      setLoading(false);
    }
    fetchData();
  }, []);

  const filteredItems = deletedItems.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  async function handlePermanentDelete(item: any) {
    if (item.type === "announcement") {
      await permanentlyDeleteAnnouncement(item.id);
    } else if (item.type === "post") {
      await permanentlyDeletePost(item.id);
    }
    setDeletedItems((prev) =>
      prev.filter((i) => i.id !== item.id || i.type !== item.type)
    );
    setModalItem(null);
  }

  async function handleRestore(item: any) {
    if (item.type === "announcement") {
      await restoreAnnouncement(item);
    } else if (item.type === "post") {
      await restorePost(item);
    }
    setDeletedItems((prev) =>
      prev.filter((i) => i.id !== item.id || i.type !== item.type)
    );
    setModalItem(null);
  }

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

  const getCategoryColor = (type: string) => {
    const colors: Record<string, string> = {
      announcement: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
      post: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
    };
    return colors[type] || "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300";
  };

  if (loading) {
    return (
      <div className="w-full h-full p-6">
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 text-center text-slate-500 dark:text-slate-400">
          Loading deleted items...
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full p-6">
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2 mb-4">
            <TbTrash className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            <PanelTitle>Recycling Bin</PanelTitle>
          </div>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Manage deleted announcements and posts
          </p>

          {/* Search Controls */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <TbSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search deleted items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="px-4 py-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                Clear Search
              </button>
            )}
          </div>
        </div>

        <div className="p-6">
          {/* Results count */}
          <div className="mb-4 text-sm text-slate-600 dark:text-slate-400">
            Showing {filteredItems.length} of {deletedItems.length} deleted items
            {searchTerm && " (filtered)"}
          </div>

          <div className="space-y-4">
            {filteredItems.map((item, index) => {
              const { date, time } = formatDate(item.deleted_at);
              const createdBy = item.profile
                ? [
                    item.profile?.first_name,
                    item.profile?.middle_name,
                    item.profile?.last_name,
                  ]
                    .filter(Boolean)
                    .join(" ")
                : item.posted_by || item.user_id || "Unknown";

              const deletedBy = item.deleted_profile
                ? [
                    item.deleted_profile?.first_name,
                    item.deleted_profile?.middle_name,
                    item.deleted_profile?.last_name,
                  ]
                    .filter(Boolean)
                    .join(" ")
                : item.deleted_by || "Unknown";

              return (
                <div
                  key={`${item.type}-${item.id}`}
                  className="group relative bg-slate-50 dark:bg-slate-800/30 rounded-lg p-4 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors border border-slate-200 dark:border-slate-700"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                        <TbTrash className="w-4 h-4 text-red-600 dark:text-red-400" />
                      </div>
                      {index < filteredItems.length - 1 && (
                        <div className="w-px h-8 bg-slate-200 dark:bg-slate-700 mt-2" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-2">
                            <TbClock className="w-4 h-4" />
                            <span className="font-medium">Deleted {date}</span>
                            <span>at</span>
                            <span>{time}</span>
                          </div>

                          <div className="text-slate-900 dark:text-white mb-2">
                            <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                            <p className="text-slate-600 dark:text-slate-300 line-clamp-2">
                              {item.content}
                            </p>
                          </div>

                          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-3">
                            <span className="flex items-center gap-1">
                              <TbUser className="w-4 h-4" />
                              Created by: {createdBy}
                            </span>
                            <span className="flex items-center gap-1">
                              <TbUser className="w-4 h-4" />
                              Deleted by: {deletedBy}
                            </span>
                          </div>

                          <div className="flex gap-2">
                            <button
                              onClick={() => setModalItem(item)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
                            >
                              View Details
                            </button>
                            <button
                              onClick={() => handleRestore(item)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-lg transition-colors"
                            >
                              <TbRestore className="w-4 h-4" />
                              Restore
                            </button>
                            <button
                              onClick={() => handlePermanentDelete(item)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                            >
                              <TbTrashX className="w-4 h-4" />
                              Delete Forever
                            </button>
                          </div>
                        </div>

                        <div className="flex-shrink-0">
                          <span
                            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                              item.type
                            )}`}
                          >
                            {item.type === "announcement" ? "Announcement" : "Post"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredItems.length === 0 && deletedItems.length > 0 && (
            <div className="text-center py-12">
              <TbSearch className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-500 dark:text-slate-400 mb-2">
                No deleted items match your search
              </p>
              <button
                onClick={() => setSearchTerm("")}
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Clear search
              </button>
            </div>
          )}

          {deletedItems.length === 0 && (
            <div className="text-center py-12">
              <TbTrash className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-500 dark:text-slate-400">
                No deleted items found
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {modalItem && (
        <div className="fixed inset-0 z-50">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/50 dark:bg-black/70"
            onClick={() => setModalItem(null)}
          />
          {/* Modal Content */}
          <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
            <div className="relative bg-white dark:bg-slate-900 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-slate-200 dark:border-slate-700">
              {/* Header */}
              <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                      <TbTrash className="w-5 h-5 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                        Deleted {modalItem.type === "announcement" ? "Announcement" : "Post"}
                      </h2>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {modalItem.title}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(
                      modalItem.type
                    )}`}
                  >
                    {modalItem.type === "announcement" ? "Announcement" : "Post"}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                {/* Metadata */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-4">
                    <div>
                      <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                        Created
                      </span>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-6 h-6 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                          <Image
                            width={24}
                            height={24}
                            src={
                              modalItem.profile?.avatar ||
                              "/default_user.svg"
                            }
                            alt=""
                          />
                        </div>
                        <span className="text-sm text-slate-900 dark:text-white">
                          {modalItem.profile
                            ? [
                                modalItem.profile?.first_name,
                                modalItem.profile?.middle_name,
                                modalItem.profile?.last_name,
                              ]
                                .filter(Boolean)
                                .join(" ")
                            : modalItem.posted_by || modalItem.user_id || "Unknown"}
                        </span>
                      </div>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {modalItem.original_created_at || modalItem.created_at
                          ? new Date(
                              modalItem.original_created_at || modalItem.created_at
                            ).toLocaleString()
                          : "Unknown"}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                        Deleted
                      </span>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-6 h-6 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                          <Image
                            width={24}
                            height={24}
                            src={
                              modalItem.deleted_profile?.avatar ||
                              "/default_user.svg"
                            }
                            alt=""
                          />
                        </div>
                        <span className="text-sm text-slate-900 dark:text-white">
                          {modalItem.deleted_profile
                            ? [
                                modalItem.deleted_profile?.first_name,
                                modalItem.deleted_profile?.middle_name,
                                modalItem.deleted_profile?.last_name,
                              ]
                                .filter(Boolean)
                                .join(" ")
                            : modalItem.deleted_by || "Unknown"}
                        </span>
                      </div>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {modalItem.deleted_at
                          ? new Date(modalItem.deleted_at).toLocaleString()
                          : "Unknown"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <div>
                    <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                      Content
                    </span>
                    <div className="mt-2 p-4 bg-slate-50 dark:bg-slate-800/30 rounded-lg">
                      <ForumPostContent content={modalItem.content} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-slate-200 dark:border-slate-700">
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setModalItem(null)}
                    className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => handleRestore(modalItem)}
                    className="px-4 py-2 text-sm font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-lg transition-colors"
                  >
                    Restore
                  </button>
                  <button
                    onClick={() => handlePermanentDelete(modalItem)}
                    className="px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                  >
                    Delete Forever
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}