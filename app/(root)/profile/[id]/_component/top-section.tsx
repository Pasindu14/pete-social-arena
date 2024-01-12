import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

const TopSection = ({ user }: { user: any }) => {
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
          <h1 className="md:text-4xl">{`${user?.data.full_name}`}</h1>
          <h1 className="md:text-md"> {`${user?.data.email}`}</h1>
          <h1 className="md:text-sm text-primary">{`${user?.data.followers} Followers`}</h1>
          <h1 className="md:text-sm text-primary">{`${user?.data.following} Following`}</h1>
        </div>
      </div>
      <Separator className="mt-4" />
    </div>
  );
};

export default TopSection;
