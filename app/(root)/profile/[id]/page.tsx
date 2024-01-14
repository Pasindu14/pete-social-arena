import { currentUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import { getUserDetails } from "@/lib/server-actions/user-actions";
import TopSection from "./_component/top-section";
import Feed from "@/components/ui/dashboard/Feed";
import {
  fetchPosts,
  fetchPostsByUser,
} from "@/lib/server-actions/post-actions";

const Profile = async ({ params }: { params: { id: string } }) => {
  const user = await getUserDetails(params.id);
  const posts = await fetchPostsByUser(user.data.id);

  return (
    <div className="container mx-auto mt-4">
      <TopSection user={user} />
      <Feed posts={posts} />
    </div>
  );
};

export default Profile;
