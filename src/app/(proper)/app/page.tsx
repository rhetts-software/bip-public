"use client";

import { useEffect, useState } from "react";
import { fetchForumPosts, fetchAnnouncements } from "@/lib/modules/dal";
import CarouselAnnouncement from "@/lib/components/CarouselAnnouncement";
import AddForum from "@/lib/components/AddForum";
import Loading from "../loading";
import { HomeSearchBar } from "@/lib/components/HomeSearchBar";
import { HomeSearchBarDropdown } from "@/lib/components/HomeSearchBarDropdown";
import ForumPost from "@/lib/components/ForumPost";
import CreatePostDialog from "@/lib/components/CreatePostDialog";

export default function AppHome() {
  const [data, setData] = useState<any[]>([]);
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [writePostDialogShown, setWritePostDialogShown] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("all");

  useEffect(() => {
    async function loadData() {
      const posts = await fetchForumPosts();
      const announcements = await fetchAnnouncements();
      setData(posts);
      setAnnouncements(announcements);
    }
    loadData().then(() => setLoading(false));
  }, []);

  const filteredData = (data ?? []).filter((item) => {
    const matchesSearch =
      item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content?.toLowerCase().includes(searchQuery.toLowerCase());

    const createdAt = new Date(item.created_at);
    const now = new Date();
    let matchesDate = true;
    if (dateFilter === "today") {
      matchesDate = createdAt.toDateString() === now.toDateString();
    } else if (dateFilter === "week") {
      const weekAgo = new Date();
      weekAgo.setDate(now.getDate() - 7);
      matchesDate = createdAt >= weekAgo;
    } else if (dateFilter === "month") {
      const monthAgo = new Date();
      monthAgo.setMonth(now.getMonth() - 1);
      matchesDate = createdAt >= monthAgo;
    }
    return matchesSearch && matchesDate;
  });

  if (isLoading) return <Loading />;

  return (
    <div className="overflow-x-hidden w-full flex-col flex items-center justify-center rounded-2xl gap-8 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-800 dark:text-white">
      <CreatePostDialog
        onPost={(post) => {
          setData((prev) => [post, ...prev]);
          setWritePostDialogShown(false);
        }}
        onCancel={() => {
          setWritePostDialogShown(false);
        }}
        shown={writePostDialogShown}
      />

      <CarouselAnnouncement height={25} items={announcements} />

      {/* Filter Bar (search + dropdown) */}
      <div className="flex flex-col sm:flex-row gap-4 mb-1 items-center w-full max-w-4xl mx-auto px-4">
        <HomeSearchBar value={searchQuery} onChange={setSearchQuery} />
        <HomeSearchBarDropdown value={dateFilter} onChange={setDateFilter} />
      </div>

      <div className="py-10 w-250 px-4 min-h-screen space-y-16">
        <AddForum onClick={() => setWritePostDialogShown(true)} />
        <div className="mx-auto space-y-6">
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <ForumPost
                archived={item.archived}
                key={item.id}
                id={item.id}
                profile={item.profile}
                created_at={item.created_at}
                title={item.title}
                content={item.content}
                comment_count={item.comment_count}
                likes={item.likes}
                dislikes={item.dislikes}
              />
            ))
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">
              No forum posts yet. Be the first to post!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
