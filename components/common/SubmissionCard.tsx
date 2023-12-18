import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getFormattedDateTime, getInitials } from "@/lib/utils";

type SubmissionCardProps = {
  profile_picture_url: string;
  full_name: string;
  postDate: Date | null;
};

const SubmissionCard = ({
  profile_picture_url,
  full_name,
  postDate,
}: SubmissionCardProps) => {
  return (
    <div>
      <div className="flex md:gap-4 gap-2 items-center">
        <Avatar className="w-6 h-6 md:w-9 md:h-9">
          <AvatarImage src={profile_picture_url} />
          <AvatarFallback>{getInitials(full_name)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col justify-center ">
          <h4 className="text-[12px] md:text-[16px]"> {full_name}</h4>
          {postDate && (
            <h4 className="text-[10px]"> {getFormattedDateTime(postDate)}</h4>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubmissionCard;
