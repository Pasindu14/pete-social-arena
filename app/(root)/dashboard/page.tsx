import React from "react";

import { currentUser } from "@clerk/nextjs";
import Feed from "@/app/(root)/dashboard/_component/feed";
import {
  fetchPosts,
  fetchPostsWithPagination,
} from "@/lib/server-actions/post-actions";

const Page = async () => {
  const user = await currentUser();
  const posts = await fetchPostsWithPagination(user?.id!, 10, 0);
  return (
    <div>
      <Feed posts={posts} />
    </div>
  );
};

export default Page;
