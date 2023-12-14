import React from "react";
import { clerkClient, currentUser } from "@clerk/nextjs";
import { fetchPosts } from "@/lib/server-actions/post-actions";
import { FeedPost } from "@/components/ui/dashboard/FeedPost";
import { getUserId } from "@/lib/utils";

const Page = async () => {
  const userId = getUserId();
  const posts = await fetchPosts(userId!);
  const asd = await currentUser();

  console.log(asd);

  return (
    <div>
      {posts.map((post) => {
        return (
          <FeedPost
            postId={post._id}
            fullName={post.author.full_name}
            profileImage={post.author.profile_picture_url}
            postDate={post.post_date}
            postImage={post.image_url}
            status={post.status}
          />
        );
      })}
    </div>
  );
};

export default Page;
