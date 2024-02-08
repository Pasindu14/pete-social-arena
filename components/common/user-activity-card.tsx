"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getFormattedDateTime, getInitials } from "@/lib/utils";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, MoreVertical } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { removePost } from "@/lib/server-actions/post-actions";
import toast from "react-hot-toast";

const UserActivityCard = ({
  profile_picture_url,
  full_name,
  postDate,
  user,
  postId,
}: {
  profile_picture_url: string;
  full_name: string;
  postDate?: Date;
  user: string;
  postId?: string;
}) => {
  const currentUser = useUser();

  const remove = async (postId: string) => {
    try {
      const data = await removePost(postId);

      if (data.success != true) {
        toast.error("Oops! Something went wrong. Please try again !");
      }

      toast.success(data.message);
    } catch (error) {
      toast.error("Oops! Something went wrong. Please try again !");
    }
  };

  return (
    <div className="flex justify-between items-center">
      <div className="flex md:gap-4 gap-2 items-center">
        <Avatar className="w-6 h-6 md:w-9 md:h-9">
          <AvatarImage src={profile_picture_url} />
          <AvatarFallback>{getInitials(full_name)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col justify-center ">
          <h4 className="text-[12px] md:text-[16px]">
            <Link href={`/profile/${user}`}> {full_name}</Link>
          </h4>
          {postDate && (
            <h4 className="text-[10px]">{getFormattedDateTime(postDate)}</h4>
          )}
        </div>
      </div>
      {currentUser.user?.id == user && postId && (
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <MoreVertical size={15} />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="md:ml-28"
              onClick={() => {
                remove(postId);
              }}
            >
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  );
};

export default UserActivityCard;
