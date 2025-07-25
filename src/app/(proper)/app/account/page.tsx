"use client";
import {
  getForumPostHistory,
  getProfile,
  getUser,
  getUserAndFullProfile,
} from "@/lib/modules/dal";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import Loading from "../../loading";
import { Tables } from "@/lib/modules/supabase.types";
import PostHistory from "@/lib/components/PostHistory";
import AccountManagement from "@/lib/components/AccountManagement";
import ProfileInformation from "@/lib/components/ProfileInformation";

export default function AccountPage() {
  const [postHistory, setPostHistory] = useState<Tables<"forum_posts">[]>([]);
  const [data, setData] = useState<{
    user: User;
    profile: any;
  }>();
  const [isLoading, setLoading] = useState(true);

  function fetchForumPostHistory() {
    getForumPostHistory().then((posts) => {
      if (posts) {
        setPostHistory(posts);
      }
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      const user = await getUserAndFullProfile();
      if (user) {
        setData(user);
        setLoading(false);
      }
    };
    fetchData();
    fetchForumPostHistory();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <>
      {data && (
        <div className="flex gap-4 min-h-full min-w-180 flex-col">
          <ProfileInformation
            verified={data.profile.role.verified}
            firstName={data.profile.first_name}
            middleName={
              data.profile.middle_name ? data.profile.middle_name : ""
            }
            lastName={data.profile.last_name}
            birthDate={data.profile.birth_date}
            address={data.profile.address}
            email={data.user.email ? data.user.email : ""}
            birthPlace={data.profile.birth_place}
            position={data.profile.position}
            avatar={data.profile.avatar ? data.profile.avatar : ""}
          />
          <AccountManagement />
          <PostHistory
            onEdited={fetchForumPostHistory}
            onDelete={fetchForumPostHistory}
            forumPosts={postHistory}
          />
        </div>
      )}
    </>
  );
}
