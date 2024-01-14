import React from "react";
import {
  fetchPosts,
  fetchPostsByUser,
} from "@/lib/server-actions/post-actions";
import { FeedPost } from "@/components/ui/dashboard/FeedPost";

const Feed = async ({ userId }: { userId: any }) => {
  const posts = await fetchPostsByUser(userId);
  console.log(posts);
  return (
    <div>
      {posts?.map((post: any) => {
        return (
          <FeedPost
            postId={post.post_id}
            postDate={post.post_created_at}
            postImage={post.post_image_url}
            author={post.author_id}
            status={post.post_status}
            profile_picture_url={post.author_profile_picture_url}
            full_name={post.author_full_name}
            is_liked_by_current_user={post.is_liked_by_user}
            post_comments_count={post.post_comments_count}
            post_likes_count={post.post_likes_count}
            key={post.post_id}
          />
        );
      })}
    </div>
  );
};

export default Feed;