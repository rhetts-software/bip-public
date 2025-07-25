import CommentSection from "@/lib/components/CommentSection";
import ForumPostContent from "@/lib/components/ForumPostContent";
import PostOptions from "@/lib/components/PostOptions";
import {
  checkUserRole,
  getPost,
  getUser,
  getUserPostReaction,
  reactToPost,
  removePostReaction,
} from "@/lib/modules/dal";

import { UserType } from "@/lib/modules/types";
import { dateToUserFriendlyString } from "@/lib/modules/utils";
import Image from "next/image";
import Link from "next/link";
import { cache, use } from "react";
import Reaction from "@/lib/components/Reaction";

type PostPageProps = {
  params: Promise<{ post: string }>;
};

const getPostCached = cache(async (slug: string) => {
  const res = await getPost(slug);
  return res;
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ post: string }>;
}) {
  const post = await getPostCached((await params).post);
  if (post) {
    return {
      title: post.title + " | Bagtas Information Portal",
    };
  } else {
    return {
      title: "Post not found",
    };
  }
}

export default function PostPage({ params }: PostPageProps) {
  const { post } = use(params);
  const fetchedPost = use(getPostCached(post));
  const user = use(getUser());
  const role = use(checkUserRole());
  const isPrivileged = role == UserType.ADMIN || role == UserType.OFFICIAL;

  if (!fetchedPost) {
    return (
      <div className="dark:text-white w-full h-full py-24 flex gap-12 flex-col items-center justify-start">
        <span className="text-4xl dark:text-white/70">
          This post does not exist or has been deleted.
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
    <>
      {fetchedPost && (
        <div className="flex-col w-full h-full flex items-center justify-start">
          <div className="relative flex w-1/2 min-w-150 flex-col gap-4 pb-48">
            <div className="bg-slate-100 border-slate-400 shadow-xl dark:bg-slate-800 border dark:border-slate-700 rounded-2xl p-12">
              <div className="dark:text-white/70  flex flex-col items-start justify-center gap-4">
                <div className="flex items-center gap-2">
                  <div className=" h-8 w-8 flex items-center justify-center rounded-full overflow-hidden">
                    <Image
                      width={32}
                      height={32}
                      src={
                        fetchedPost.avatar
                          ? fetchedPost.avatar
                          : "/default_user.svg"
                      }
                      alt=""
                    ></Image>
                  </div>
                  <span className="text-lg">
                    {[
                      fetchedPost.first_name,
                      fetchedPost.middle_name,
                      fetchedPost.last_name,
                    ].join(" ")}
                  </span>
                  <span className="opacity-40 px-2">
                    {dateToUserFriendlyString(new Date(fetchedPost.created_at))}
                  </span>
                </div>
                <span className="dark:text-white font-extrabold text-3xl">
                  {fetchedPost.title}
                </span>
                <ForumPostContent
                  content={fetchedPost.content}
                ></ForumPostContent>
                <div className="flex gap-2 mt-2">
                  <Reaction
                    react={reactToPost}
                    removeReaction={removePostReaction}
                    fetchInitialReaction={getUserPostReaction}
                    parentId={fetchedPost.id}
                    initialLikes={fetchedPost.likes ?? 0}
                    initialDislikes={fetchedPost.dislikes ?? 0}
                  />
                </div>
                <div className="absolute top-4 right-4">
                  <PostOptions
                    post={fetchedPost}
                    viewLink=""
                    isViewOptionVisible={false}
                    isOwnPost={user?.id == fetchedPost.user_id}
                    reloadAfterEdit={true}
                    reloadAfterDelete={true}
                    isPrivileged={isPrivileged}
                  ></PostOptions>
                </div>
              </div>
            </div>
            <div className="w-full bg-slate-100 border-slate-400 shadow-xl dark:bg-slate-800 border dark:border-slate-700 rounded-2xl p-12">
              <CommentSection postId={fetchedPost.id}></CommentSection>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
