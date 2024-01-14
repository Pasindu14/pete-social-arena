import React from "react";

import { getUserId } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs";
import { fetchCommentsByPost } from "@/lib/server-actions/comment-actions";
import Feed from "@/components/ui/dashboard/Feed";
import { fetchPosts } from "@/lib/server-actions/post-actions";

const Page = async () => {
  const user = await currentUser();
  const posts = await fetchPosts(user?.id!);
  return <Feed posts={posts} />;
};

export default Page;
