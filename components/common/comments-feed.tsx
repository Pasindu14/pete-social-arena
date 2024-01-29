import React, { memo } from "react";
import UserActivityCard from "./user-activity-card";

type CommentProps = {
  comments: any;
  post: Post;
};
const CommentsFeed = ({ comments, post }: CommentProps) => {
  return (
    <div
      className={`p-2 ${
        comments.length > 0 ? "md:h-[60vh]" : "h-[25vh]"
      }    overflow-y-scroll custom-scrollbar`}
    >
      {comments.map((comment: any) => {
        return (
          <div
            key={comment.comment_id}
            className="py-2 bg-slate-300/[.04] rounded-xl px-2 mb-2"
          >
            <UserActivityCard
              postDate={post.postDate}
              user={comment.author}
              full_name={comment.full_name}
              profile_picture_url={comment.profile_picture_url}
            />

            <div className="px-4 py-2 mt-2 border-t border-gray-300/[0.05]">
              <p className="text-xs">{comment.comment}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default memo(CommentsFeed);
