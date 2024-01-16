import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { currentUser } from "@clerk/nextjs";
import { updateFollowers } from "@/lib/server-actions/user-actions";
import FollowButton from "./follow_button";

const TopSection = async ({ user }: { user: any }) => {
  const loggedInUser = await currentUser();

  return (
    <div>
      <div className="flex flex-row items-center gap-6">
        <div>
          <Avatar className="md:w-48 md:h-48">
            <AvatarImage src={user.data.profile_picture_url} alt="@profile" />
            <AvatarFallback>{getInitials(user.data.full_name)}</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row  items-center gap-2">
            <h1 className="md:text-4xl">{`${user?.data.full_name}`}</h1>
            {user.data.id != loggedInUser?.id && (
              <FollowButton
                targetUserId={user.data.id}
                followerId={loggedInUser?.id!}
              />
            )}
          </div>
          <h1 className="md:text-sm text-primary">{`${user?.data.followers_count} Followers`}</h1>
          <h1 className="md:text-sm text-primary">{`${user?.data.following_count} Following`}</h1>
        </div>
      </div>
      <Separator className="mt-4" />
    </div>
  );
};

export default TopSection;
