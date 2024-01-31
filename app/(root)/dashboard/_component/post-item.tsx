"use client";
import React, { useState, useMemo, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import LikeButton from "@/components/common/like-button";
import CommentButton from "@/app/(root)/dashboard/_component/comment-button";
import ShareButton from "@/components/common/share-button";
import UserActivityCard from "@/components/common/user-activity-card";
import { usePost } from "@/hooks/usePost";
import EngagementCounter from "@/components/common/engagement-counter";

export function PostItem(postParam: Post) {
  const { post, likePost, commentPost, likeText, commentText } =
    usePost(postParam);

  return (
    <div className="flex flex-col items-center justify-center">
      <section className={`mt-4 md:w-3/5 w-full p-4 rounded-xl bg-[#110e0e8f]`}>
        <div className="flex items-center justify-center">
          <div className="grid md:grid-cols-1 md:w-[50vw]">
            <UserActivityCard
              full_name={post.full_name}
              profile_picture_url={post.profile_picture_url}
              postDate={post.postDate}
              user={post.author}
            />
            <Separator className="my-4 bg-white " />
            {/*    image and status showing up here */}
            {post.postImage && (
              <div className="relative md:h-[40vh] h-[25vh]">
                <Image
                  fill
                  src={post.postImage}
                  alt=""
                  objectFit="cover"
                  className="rounded-xl"
                  priority
                />
              </div>
            )}
            <p className="mt-4">{post.status}</p>

            <EngagementCounter likeText={likeText} commentText={commentText} />

            <Separator className="my-4 bg-white" />

            <div className="flex items-center justify-between gap-8 md:px-32">
              <LikeButton
                postId={String(post.postId)}
                is_liked_by_user={post.is_liked_by_current_user}
                iconSize={25}
                likeCallback={likePost}
              />
              <CommentButton post={post} commentCallback={commentPost} />

              <ShareButton postId={String(post.postId)} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
