import React from "react";
import { fetchPosts } from "@/lib/server-actions/post-actions";
import { FeedPost } from "@/components/ui/dashboard/FeedPost";
import { getUserId } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs";
import { fetchCommentsByPost } from "@/lib/server-actions/comment-actions";

const Page = async () => {
  const user = await currentUser();
  const posts = await fetchPosts(user?.id!);
  const comments = await fetchCommentsByPost(
    "a62b03d8-353a-4991-901e-a0d73f029034"
  );

  return (
    <div>
      {posts?.map((post: any) => {
        return (
          <FeedPost
            postId={post.post_id}
            postDate={post.post_created_at}
            postImage={post.post_image_url}
            status={post.post_status}
            profile_picture_url={post.author_profile_picture_url}
            full_name={post.author_full_name}
            is_liked_by_current_user={post.is_liked_by_user}
            key={post.post_id}
          />
        );
      })}
    </div>
  );
};

export default Page;
