import ForumPostContent from "@/lib/components/ForumPostContent";
import { getAnnouncement } from "@/lib/modules/dal";
import { dateToUserFriendlyString } from "@/lib/modules/utils";
import Image from "next/image";
import Link from "next/link";
import { cache } from "react";

type AnnouncementPageProps = {
  params: Promise<{ announcement: string }>;
};

const getAnnouncementCached = cache(async (slug: string) => {
  return await getAnnouncement(slug);
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ announcement: string }>;
}) {
  const announcement = await getAnnouncementCached((await params).announcement);
  if (announcement) {
    return {
      title: announcement.title + " | Bagtas Information Portal",
    };
  } else {
    return {
      title: "Announcement not found",
    };
  }
}

export default async function AnnouncementPage({
  params,
}: AnnouncementPageProps) {
  const fetchedAnnouncement = await getAnnouncementCached(
    (
      await params
    ).announcement
  );

  if (!fetchedAnnouncement) {
    return (
      <div className="dark:text-white w-full h-full py-24 flex gap-12 flex-col items-center justify-start">
        <span className="text-4xl dark:text-white/70">
          This announcement does not exist or has been deleted.
        </span>
        <Link
          href={"/app"}
          className="dark:bg-slate-800 dark:border-slate-700 dark:hover:bg-slate-700/50 duration-200 transition-all border py-4 px-6 text-xl rounded-2xl"
        >
          Return to home
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex-col h-full flex items-center justify-start relative overflow-hidden">
      <div className="w-full flex flex-col gap-4 pb-48 relative z-10 items-center">
        <div className="w-full max-w-2xl border dark:border-slate-800 rounded-2xl overflow-hidden bg-white/80 dark:bg-slate-900/80 backdrop-blur relative">
          {/* Banner Image */}
          {fetchedAnnouncement.banner_image && (
            <div className="relative w-full">
              <Image
                src={fetchedAnnouncement.banner_image}
                alt="Announcement Banner"
                width={1200}
                height={400}
                className="w-full h-auto"
                style={{ objectFit: "contain", backgroundColor: "#000" }}
                priority
              />
              <div className="absolute inset-0 bg-black/60 z-10 pointer-events-none" />
              <div className="absolute inset-0 flex flex-col items-center justify-center z-20 p-8">
                <span className="dark:text-white font-extrabold text-3xl text-center w-full drop-shadow-lg">
                  {fetchedAnnouncement.title}
                </span>
              </div>
            </div>
          )}

          {/* Content Card */}
          <div className="relative z-20 w-full p-12 flex flex-col items-center justify-center">
            <div className="dark:text-white/70 flex flex-col items-center justify-center gap-4 w-full">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 flex items-center justify-center rounded-full overflow-hidden">
                  <Image
                    width={32}
                    height={32}
                    src={
                      fetchedAnnouncement.profile?.avatar
                        ? fetchedAnnouncement.profile.avatar
                        : "/default_user.svg"
                    }
                    alt=""
                  />
                </div>
                <span className="text-lg">
                  {[
                    fetchedAnnouncement.profile?.first_name,
                    fetchedAnnouncement.profile?.middle_name,
                    fetchedAnnouncement.profile?.last_name,
                  ]
                    .filter(Boolean)
                    .join(" ")}
                </span>
                <span className="opacity-40 px-2">
                  {dateToUserFriendlyString(
                    new Date(fetchedAnnouncement.created_at)
                  )}
                </span>
              </div>
              {/* Only show title here if there is no banner */}
              {!fetchedAnnouncement.banner_image && (
                <span className="dark:text-white font-extrabold text-3xl text-center w-full">
                  {fetchedAnnouncement.title}
                </span>
              )}
              <div className="w-full text-center">
                <ForumPostContent content={fetchedAnnouncement.content} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
