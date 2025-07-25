import Image from "next/image";
import { dateToUserFriendlyString } from "../modules/utils";
import ForumPostContent from "./ForumPostContent";
import PostOptions from "./PostOptions";
import PanelTitle from "./PanelTitle";
import Link from "next/link";

export default function PostHistory({
  forumPosts,
  onDelete,
  onEdited,
}: {
  forumPosts: any[];
  onDelete: () => any;
  onEdited: () => any;
}) {
  return (
    <div className="flex flex-col gap-8 border p-4 rounded-2xl border-slate-400  dark:border-slate-700 dark:bg-slate-800/20 bg-slate-200/20">
      <PanelTitle>Post History</PanelTitle>
      <div className="w-full flex-col justify-center items-center flex dark:text-white/80 text-black/80 p-4 gap-4">
        {forumPosts.map((post) => (
          <div
            key={post.id}
            className="relative flex w-1/2 duration-200 transition-all flex-col gap-4 items-start justify-center border dark:bg-slate-800 rounded-lg dark:border-slate-700 py-6 px-6"
          >
            <div className="w-full flex justify-between items-center">
              <div className="flex gap-4 items-center">
                <Link
                  href={`/app/posts/${post.id}`}
                  className="text-xl hover:underline font-bold"
                >
                  {post.title}
                </Link>
                <div className="flex gap-2 items-center">
                  <div className="rounded-full w-8 h-8 overflow-hidden flex items-center justify-center">
                    <Image
                      src={
                        post.profile.avatar
                          ? post.profile.avatar
                          : "/default_user.svg"
                      }
                      width={32}
                      height={32}
                      alt=""
                    ></Image>
                  </div>
                  <span>
                    {[
                      post.profile.first_name,
                      post.profile.middle_name
                        ? post.profile.middle_name.charAt(0) + "."
                        : "",
                      post.profile.last_name,
                    ].join(" ")}
                  </span>
                </div>
                <span className="opacity-50 ">
                  Posted {dateToUserFriendlyString(new Date(post.created_at))}
                </span>
              </div>
              <PostOptions
                post={post}
                isOwnPost={true}
                viewLink={`/app/posts/${post.id}`}
                onDeleted={() => {
                  onDelete?.();
                }}
                onEdited={() => {
                  onEdited?.();
                }}
              ></PostOptions>
            </div>
            <ForumPostContent content={post.content}></ForumPostContent>
          </div>
        ))}
        {forumPosts.length == 0 && <span className="text-2xl">No posts.</span>}
      </div>
    </div>
  );
}
