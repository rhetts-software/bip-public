import Image from "next/image";
import { dateToUserFriendlyString } from "../modules/utils";
import {
  TbFlag,
  TbMessage,
  TbPlus,
  TbThumbDown,
  TbThumbUp,
} from "react-icons/tb";
import CommentActions from "./CommentActions";
import Comments from "./Comments";
import { useEffect, useState } from "react";
import { getReplies } from "../modules/dal";

interface CommentProps {
  id: string;
  content: string;
  avatar?: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  createdAt: string;
  postId: string;
  repliesCount: number;
  likes: number;
  dislikes: number;
}
export default function Comment({
  content,
  avatar,
  postId,
  id,
  firstName,
  middleName,
  lastName,
  createdAt,
  repliesCount,
  likes,
  dislikes,
}: CommentProps) {
  const [loadingReplies, setLoadingReplies] = useState(false);
  const [replies, setReplies] = useState<any[]>([]);
  const [hidden, setHidden] = useState(false);
  async function loadReplies() {
    setLoadingReplies(true);
    getReplies(postId, id).then((data) => {
      setReplies(data);
      setLoadingReplies(false);
    });
  }

  return (
    <div className="w-full  dark:text-white/80 justify-start items-start  flex flex-col">
      <div className="flex items-center gap-2 mb-2">
        {!hidden ? (
          <div className="h-8 w-8 overflow-hidden rounded-full flex items-center justify-center">
            <Image
              src={avatar ? avatar : "/default_user.svg"}
              width={32}
              height={32}
              alt=""
            ></Image>
          </div>
        ) : (
          <button
            onClick={() => {
              setHidden(false);
            }}
            className="border cursor-pointer rounded-full flex items-center text-center justify-center w-5 h-5 mx-1.5"
          >
            <TbPlus></TbPlus>
          </button>
        )}
        <span className="text-xm dark:text-white/70 ">
          {[firstName, middleName, lastName].join(" ")}
        </span>
        <span className="dark:text-white/30 text-black/60">
          {dateToUserFriendlyString(new Date(createdAt))}
        </span>
      </div>
      {!hidden ? (
        <div className="flex flex-col w-full items-start ml-4 gap-2 relative">
          <button
            onClick={() => {
              setHidden(true);
            }}
            className="absolute border-black/20 hover:border-black/40 dark:hover:border-white/50 cursor-pointer h-full w-12 left-0 top-0 border-l-2  dark:border-white/20 rounded-bl-2xl "
          ></button>
          <span className="text-lg px-10">{content}</span>
          <CommentActions
            postId={postId}
            id={id}
            onReply={loadReplies}
            initialLikes={likes}
            initialDislikes={dislikes}
          ></CommentActions>
          {replies?.length == 0 && repliesCount > 0 && (
            <button
              onClick={() => {
                loadReplies();
              }}
              className="cursor-pointer px-10 text-gray-400 hover:text-gray-300"
            >
              {loadingReplies
                ? "Loading..."
                : `Show ${repliesCount} ${
                    repliesCount == 1 ? "reply" : "replies"
                  }`}
            </button>
          )}
          {replies?.length > 0 && (
            <button
              onClick={() => {
                setReplies([]);
              }}
              className="cursor-pointer px-10 text-gray-400 hover:text-gray-300"
            >
              Hide replies
            </button>
          )}
          <div className="flex flex-col pl-10 w-full ">
            {replies?.length > 0 && (
              <Comments
                loading={false}
                postId={postId}
                comments={replies}
              ></Comments>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
