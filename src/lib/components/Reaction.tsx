"use client";
import { useEffect, useState } from "react";
import {
  TbThumbUp,
  TbThumbDown,
  TbThumbUpFilled,
  TbThumbDownFilled,
} from "react-icons/tb";
import { ReactionType } from "../modules/types";

interface ReactionsProps {
  parentId: string;
  initialLikes: number;
  initialDislikes: number;
  react: (id: string, type: ReactionType) => Promise<any>;
  removeReaction: (id: string) => Promise<any>;
  fetchInitialReaction: (id: string) => Promise<ReactionType>;
}

export default function Reaction({
  parentId,
  initialLikes,
  initialDislikes,
  react,
  removeReaction,
  fetchInitialReaction,
}: ReactionsProps) {
  const [userReaction, setUserReaction] = useState<"like" | "dislike" | null>(
    null
  );
  const [reactArray, setReactArray] = useState<[number, number]>([
    initialLikes,
    initialDislikes,
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInitialReaction(parentId).then((reaction) => {
      if (reaction == "like") {
        setUserReaction("like");
      } else if (reaction == "dislike") {
        setUserReaction("dislike");
      }
      setLoading(false);
    });
  }, []);

  const handleReact = async (type: "like" | "dislike") => {
    if (userReaction === type) {
      setUserReaction(null);
      switch (type) {
        case "like":
          setReactArray((prev) => [prev[0] - 1, prev[1]]);
          break;
        case "dislike":
          setReactArray((prev) => [prev[0], prev[1] - 1]);
          break;
      }
      removeReaction(parentId);
    } else {
      setUserReaction(type);
      switch (type) {
        case "like":
          if (userReaction == null) {
            setReactArray((prev) => [prev[0] + 1, prev[1]]);
          } else {
            setReactArray((prev) => [prev[0] + 1, prev[1] - 1]);
          }

          break;
        case "dislike":
          if (userReaction == null) {
            setReactArray((prev) => [prev[0], prev[1] + 1]);
          } else {
            setReactArray((prev) => [prev[0] - 1, prev[1] + 1]);
          }
          break;
      }
      react(parentId, type);
    }
  };

  return (
    <div className="flex gap-3 *:cursor-pointer">
      <button
        disabled={loading}
        className={`${
          userReaction === "like" ? "text-brand-green-400" : ""
        } p-1 hover:text-brand-green-400 rounded-lg flex items-center gap-2 transition-all duration-200 text-sm font-medium
          
        `}
        onClick={() => handleReact("like")}
      >
        {userReaction === "like" ? (
          <TbThumbUpFilled size={24} />
        ) : (
          <TbThumbUp size={24} />
        )}
        <span className="text-lg">{!loading ? reactArray[0] : "Like"}</span>
      </button>
      <button
        disabled={loading}
        className={`${
          userReaction === "dislike" ? "text-red-400" : ""
        } p-1 hover:text-red-400 rounded-lg flex items-center gap-2 transition-all duration-200 text-sm font-medium
          
        `}
        onClick={() => handleReact("dislike")}
      >
        {userReaction === "dislike" ? (
          <TbThumbDownFilled size={24} />
        ) : (
          <TbThumbDown size={24} />
        )}
        <span className="text-lg">{!loading ? reactArray[1] : "Dislike"}</span>
      </button>
    </div>
  );
}
