import React from "react";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { MessageCircle, Share2, ThumbsUp } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { primaryColor } from "@/constants/colors";
import { getFormattedDateTime, getInitials, getUserId } from "@/lib/utils";
import LikeButton from "@/components/common/LikeButton";

interface FeedPostProps {
  postId: string;
  postDate: Date;
  postImage: string;
  status: string;
  profile_picture_url: string;
  full_name: string;
  is_liked_by_current_user: boolean;
}

export function FeedPost({
  postId,
  postDate,
  postImage,
  status,
  profile_picture_url,
  full_name,
  is_liked_by_current_user,
}: FeedPostProps) {
  return (
    <div className="flex flex-col items-center justify-center">
      <section
        className={`mt-4 bg-[${primaryColor}] md:w-3/5 w-full p-4 rounded-xl bg-opacity-5`}
      >
        <div className="flex items-center justify-center">
          <div className="grid md:grid-cols-1 md:w-[50vw]">
            <div className="flex gap-4 items-center">
              <Avatar>
                <AvatarImage src={profile_picture_url} />
                <AvatarFallback>{getInitials(full_name)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col justify-center ">
                <p>{full_name}</p>
                <h4 className="text-xs"> {getFormattedDateTime(postDate)}</h4>
              </div>
            </div>

            <div>
              <Separator className="my-4 bg-white " />
            </div>

            {postImage && (
              <div className="relative md:h-[40vh] h-[25vh]">
                <Image
                  fill
                  src={postImage}
                  alt=""
                  objectFit="cover"
                  className="rounded-xl"
                  priority
                />
              </div>
            )}
            <p className="mt-4">{status}</p>
            <div>
              <Separator className="my-4 bg-white" />
            </div>
            <div className="flex items-center justify-between gap-8 md:px-32">
              <LikeButton
                postId={String(postId)}
                is_liked_by_user={is_liked_by_current_user}
              />
              <div className="flex gap-2 items-center justify-center">
                <MessageCircle className={`hover:text-[${primaryColor}]`} />
                <h1>Comment</h1>
              </div>
              <div className="flex gap-2 items-center justify-center">
                <Share2 className={`hover:text-[${primaryColor}]`} />
                <h1>Share</h1>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
