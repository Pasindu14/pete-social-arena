import { fetchCommentsByPost } from "@/lib/server-actions/comment-actions";
import React from "react";
import SubmissionCard from "./SubmissionCard";

const CommentsCard = async () => {
  const comments = await fetchCommentsByPost(
    "a62b03d8-353a-4991-901e-a0d73f029034"
  );

  return (
    <div className="p-2">
      {comments &&
        comments.map((comment: any) => (
          <div
            key={comment.id}
            className="py-2 bg-slate-300/[.04] rounded-xl px-2 mb-2"
          >
            <SubmissionCard
              full_name={comment.full_name}
              postDate={null}
              profile_picture_url={comment.profile_picture_url}
            />

            <div className="px-4 py-2 mt-2 border-t border-gray-300/[0.05]">
              <p className="text-xs">{comment.comment}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default CommentsCard;
