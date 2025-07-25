"use client";
import { use, useEffect, useState } from "react";
import getPostComments, { getPost } from "../modules/dal";
import Loading from "@/app/(proper)/loading";
import Comment from "./Comment";

interface CommentsProps {
  postId: string;
  comments: any[];
  loading?: boolean;
}
export default function Comments({
  postId,
  loading = true,
  comments,
}: CommentsProps) {
  if (loading) {
    return <Loading></Loading>;
  }
  if (comments.length == 0) {
    return (
      <div className="flex flex-col w-full items-center justify-center py-24">
        <span className="dark:text-white/50 text-3xl font-bold">
          No comments. Be the first one!
        </span>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col gap-6 w-full items-start justify-center">
        {comments.map((comment, index) => (
          <div key={index} className="w-full">
            <Comment
              repliesCount={comment.child_count}
              avatar={comment.avatar}
              firstName={comment.first_name}
              middleName={comment.middle_name}
              lastName={comment.last_name}
              content={comment.content}
              createdAt={comment.created_at}
              id={comment.id}
              postId={postId}
              likes={comment.likes}
              dislikes={comment.dislikes}
            ></Comment>
          </div>
        ))}
      </div>
    );
  }
}
