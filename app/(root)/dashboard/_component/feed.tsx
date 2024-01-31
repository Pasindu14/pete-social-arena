"use client";
import React, { useState } from "react";
import { PostItem } from "@/app/(root)/dashboard/_component/post-item";
import { Button } from "@/components/ui/button";
import { fetchPostsWithPagination } from "@/lib/server-actions/post-actions";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";

import { loaderColor } from "@/constants/colors";
import { Loader } from "@/components/common/loader";

type FeedProps = {
  posts: any;
};

const Feed = ({ posts: intialPosts }: FeedProps) => {
  const [posts, setPosts] = useState(intialPosts);
  const [offset, setOffset] = useState(10);
  const [loading, setLoading] = useState(false);

  const { user } = useUser();

  const loadMorePosts = async () => {
    try {
      setLoading(true);
      const newPosts = await fetchPostsWithPagination(user?.id!, 10, offset);
      if (newPosts && newPosts.length > 0) {
        setOffset(offset + 10);
        setPosts((prevPosts: any) => [...prevPosts, ...newPosts]);
      }
    } catch (error) {
      toast.error("Oops! Something went wrong. Please try again !");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {posts?.map((post: any) => {
        return (
          <div key={post.post_id}>
            <PostItem
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
          </div>
        );
      })}
      <div className="flex items-center justify-center mt-4 mb-4">
        <Button
          variant="outline"
          type="button"
          disabled={loading}
          onClick={loadMorePosts}
        >
          {loading == true ? (
            <div className="flex items-center justify-center gap-2">
              <p>Load more</p>
              <Loader size={13} color={loaderColor} />
            </div>
          ) : (
            "Load more"
          )}
        </Button>
      </div>
    </div>
  );
};

export default Feed;
