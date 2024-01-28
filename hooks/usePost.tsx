import { formatComments, formatLikes } from "@/lib/utils";
import React, { useEffect, useMemo, useState } from "react";

export const usePost = (initialPost: Post) => {
  const [post, setPost] = useState<Post>(initialPost);

  const likePost = async () => {
    setPost({
      ...post,
      is_liked_by_current_user: !post.is_liked_by_current_user,
      post_likes_count:
        post.post_likes_count + (!post.is_liked_by_current_user ? 1 : -1),
    });
  };

  const likeText = useMemo(() => {
    return formatLikes(post.post_likes_count, post.is_liked_by_current_user);
  }, [post.post_likes_count, post.is_liked_by_current_user]);

  const commentText = useMemo(() => {
    return formatComments(post.post_comments_count);
  }, [post.post_likes_count]);

  return {
    post,
    likePost,
    likeText,
    commentText,
  };
};
