import { currentUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import { getUserDetails } from "@/lib/server-actions/user-actions";
import TopSection from "./_component/top-section";

const Profile = async ({ params }: { params: { id: string } }) => {
  const user = await getUserDetails(params.id);

  return (
    <div className="container mx-auto mt-4">
      <TopSection user={user} />
    </div>
  );
};

export default Profile;
