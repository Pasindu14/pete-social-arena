import React from "react";
import { fetchPosts } from "@/lib/server-actions/post-actions";
import { FeedPost } from "@/components/ui/dashboard/FeedPost";
import { getUserId } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs";
import { fetchCommentsByPost } from "@/lib/server-actions/comment-actions";

const Page = async () => {
  const user = await currentUser();
  const posts = await fetchPosts(user?.id!);

  return (
    <div>
      {posts?.map((post: any) => {
        console.log(post);
        return (
          <FeedPost
            postId={post.post_id}
            postDate={post.post_created_at}
            postImage={post.post_image_url}
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

export default Page;
