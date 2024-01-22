import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { currentUser } from "@clerk/nextjs";
import { updateFollowers } from "@/lib/server-actions/user-actions";
import FollowButton from "./follow_button";
import { Edit } from "lucide-react";
import EditBioDialog from "./edit-bio-dialog";

const TopSection = async ({ user }: { user: any }) => {
  const loggedInUser = await currentUser();

  return (
    <div>
      <div className="md:flex flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6 md:basis-1/2">
          <div>
            <Avatar className="md:w-48 md:h-48 w-24 h-24">
              <AvatarImage src={user.data.profile_picture_url} alt="@profile" />
              <AvatarFallback>
                {getInitials(user.data.full_name)}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="md:flex flex-col gap-2 flex-1">
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

        <div
          className={`bio ${
            user?.data.bio ? "basis-1/2" : "basis-0"
          } border border-white/20 rounded-lg p-4`}
        >
          <EditBioDialog bio={user?.data.bio} id={loggedInUser?.id!} />
        </div>
      </div>
      <Separator className="mt-4" />
    </div>
  );
};

export default TopSection;
