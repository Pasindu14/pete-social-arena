import { currentUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import {
  fetchFollowStatus,
  getUserDetails,
} from "@/lib/server-actions/user-actions";
import TopSection from "./_component/top-section";
import Feed from "@/components/ui/dashboard/feed";
import { fetchPostsByUser } from "@/lib/server-actions/post-actions";
import { redirect } from "next/navigation";

const Profile = async ({ params }: { params: { id: string } }) => {
  const user = await getUserDetails(params.id);

  if (!user.data) {
    redirect("/404");
  }
  const posts = await fetchPostsByUser(user.data.id);

  return (
    <div className="  mt-4">
      <TopSection user={user} />
      <Feed posts={posts} />
    </div>
  );
};

export default Profile;
