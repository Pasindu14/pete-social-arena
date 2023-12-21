import React from "react";
import SubmissionCard from "./SubmissionCard";

type CommentProps = {
  comments: any;
};
const CommentsCard = ({ comments }: CommentProps) => {
  return (
    <div className="p-2">
      {comments.map((comment: any) => (
        <div
          key={comment.comment_id}
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
