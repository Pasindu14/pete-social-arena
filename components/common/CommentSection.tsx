import { primaryColor } from "@/constants/colors";
import { MessageCircle } from "lucide-react";
import React, { Suspense } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "../ui/dialog";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getFormattedDateTime, getInitials } from "@/lib/utils";
import { Separator } from "../ui/separator";
import LikeButton from "./LikeButton";
import ShareButton from "./ShareButton";
import CommentForm from "./CommentInput";
import SubmissionCard from "./SubmissionCard";
import CommentsCard from "./CommentsCard";
import CommentButton from "./CommentButton";
import { LoaderFull } from "./Loader";
import dynamic from "next/dynamic";

interface CommentProps {
  postId: string;
  postDate: Date;
  postImage: string;
  status: string;
  profile_picture_url: string;
  full_name: string;
  is_liked_by_current_user: boolean;
  dialogOpen: boolean;
}

const CommentSection = ({
  postId,
  postDate,
  postImage,
  status,
  profile_picture_url,
  full_name,
  is_liked_by_current_user,
  dialogOpen,
}: CommentProps) => {
  return (
    <div className="flex gap-2 items-center justify-center">
      <Dialog open={dialogOpen}>
        <DialogContent className="sm:max-w-7xl ">
          <div className="grid md:grid-cols-7 ">
            <div className="md:col-span-5">
              {postImage && (
                <div className="relative md:h-[50vh] h-[25vh]">
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
            </div>
            <div className="md:col-span-2 md:p-6 p-2 ">
              <SubmissionCard
                profile_picture_url={profile_picture_url}
                full_name={full_name}
                postDate={postDate}
              />
              <Separator className="mt-4" />
              <div className="flex items-center justify-between gap-1 mt-2">
                <LikeButton
                  postId={String(postId)}
                  is_liked_by_user={is_liked_by_current_user}
                  iconSize={15}
                />

                {/*                 <CommentSection
                  postId={String(postId)}
                  postDate={postDate}
                  postImage={postImage}
                  status={status}
                  profile_picture_url={profile_picture_url}
                  full_name={full_name}
                  is_liked_by_current_user={is_liked_by_current_user}
                />
 */}
                <ShareButton postId={String(postId)} />
              </div>

              <CommentForm postId={postId} />

              <Separator className="mt-2" />

              <CommentsCard />
            </div>
          </div>
          {/* 
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader> */}

          <DialogFooter></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CommentSection;
