"use client";
import { useEffect, useState } from "react";
import getPostComments from "../modules/dal";
import Comments from "./Comments";
import PanelTitle from "./PanelTitle";
import PostCommentArea from "./PostCommentArea";
interface CommentSectionProps {
  postId: string;
}

export default function CommentSection({ postId }: CommentSectionProps) {
  const [isLoading, setLoading] = useState(true);
  const [comments, setComments] = useState<any[]>([]);

  useEffect(() => {
    getPostComments(postId).then((data) => {
      if (data) {
        setComments(data);
        setLoading(false);
      }
    });
  }, []);
  return (
    <>
      <PostCommentArea
        onPost={(comment) => {
          if (comment) {
            console.log(comments);
            console.log(comment);
            setComments((prev) => [comment, ...prev]);
          }
        }}
        postId={postId}
      ></PostCommentArea>
      <PanelTitle>Comments {`(${comments.length})`}</PanelTitle>
      <div className="flex py-12">
        <Comments
          loading={isLoading}
          comments={comments}
          postId={postId}
        ></Comments>
      </div>
    </>
  );
}
