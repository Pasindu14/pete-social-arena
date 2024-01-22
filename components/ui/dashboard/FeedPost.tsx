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
  author: string;
  status: string;
  profile_picture_url: string;
  full_name: string;
  is_liked_by_current_user: boolean;
  post_likes_count: number;
  post_comments_count: number;
}

export async function FeedPost({
  postId,
  postDate,
  postImage,
  author,
  status,
  profile_picture_url,
  full_name,
  is_liked_by_current_user,
  post_likes_count,
  post_comments_count,
}: FeedPostProps) {
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
              userId={author}
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
            <div className="flex justify-between gap-4 mt-2">
              {post_likes_count > 0 ? (
                <h4 className="text-xs">{`${post_likes_count} likes`}</h4>
              ) : (
                <h4></h4>
              )}

              {post_comments_count > 0 ? (
                <h4 className="text-xs">{`${post_comments_count} comments`}</h4>
              ) : (
                <h4></h4>
              )}
            </div>
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
                author={author}
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
