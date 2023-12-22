"use server";
import React from "react";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { primaryColor } from "@/constants/colors";
import LikeButton from "@/components/common/LikeButton";
import CommentSection from "@/components/common/CommentSection";
import ShareButton from "@/components/common/ShareButton";
import SubmissionCard from "@/components/common/SubmissionCard";
import { Button } from "../button";
import CommentButton from "@/components/common/CommentButton";
import Test from "@/components/common/Test";
import { fetchCommentsByPost } from "@/lib/server-actions/comment-actions";

interface FeedPostProps {
  postId: string;
  postDate: Date;
  postImage: string;
  status: string;
  profile_picture_url: string;
  full_name: string;
  is_liked_by_current_user: boolean;
}

export async function FeedPost({
  postId,
  postDate,
  postImage,
  status,
  profile_picture_url,
  full_name,
  is_liked_by_current_user,
}: FeedPostProps) {
  /*   const datat = await fetchCommentsByPost(postId);
  console.log(datat); */
  return (
    <div className="flex flex-col items-center justify-center">
      <section
        className={`mt-4 bg-[${primaryColor}] md:w-3/5 w-full p-4 rounded-xl bg-opacity-5`}
      >
        <div className="flex items-center justify-center">
          <div className="grid md:grid-cols-1 md:w-[50vw]">
            <SubmissionCard
              profile_picture_url={profile_picture_url}
              full_name={full_name}
              postDate={postDate}
            />

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
                iconSize={25}
              />

              <CommentSection
                postId={String(postId)}
                postDate={postDate}
                postImage={postImage}
                status={status}
                profile_picture_url={profile_picture_url}
                full_name={full_name}
                is_liked_by_current_user={is_liked_by_current_user}
              />

              <ShareButton postId={String(postId)} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
