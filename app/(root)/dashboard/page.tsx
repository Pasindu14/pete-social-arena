import React from "react";

import { getUserId } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs";
import { fetchCommentsByPost } from "@/lib/server-actions/comment-actions";
import Feed from "@/components/ui/dashboard/Feed";

const Page = async () => {
  const user = await currentUser();
  return <Feed userId={user?.id} />;
};

export default Page;
