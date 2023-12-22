"use client";

import { primaryColor } from "@/constants/colors";
import { MessageCircle } from "lucide-react";
import React, { Suspense, useEffect, useState } from "react";
import { cache } from "react";
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
import { Loader, LoaderFull } from "./Loader";

import { fetchCommentsByPost } from "@/lib/server-actions/comment-actions";
import { revalidatePath } from "next/cache";
import { Comment } from "@/lib/models/comment.model";
import toast from "react-hot-toast";

interface CommentProps {
  postId: string;
  postDate: Date;
  postImage: string;
  status: string;
  profile_picture_url: string;
  full_name: string;
  is_liked_by_current_user: boolean;
}

export const revalidate = 0;

const CommentSection = ({
  postId,
  postDate,
  postImage,
  status,
  profile_picture_url,
  full_name,
  is_liked_by_current_user,
}: CommentProps) => {
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState<Comment[] | null>([]);

  const handleOpen = async () => {
    setLoading(true);
    try {
      fetchedAndSetComments();
    } catch (error) {
      toast.error("Oops! Something went wrong. Please try again !");
    } finally {
      setLoading(false);
    }
  };

  const fetchedAndSetComments = async () => {
    const fetchedComments = await fetchCommentsByPost(postId);
    setComments(fetchedComments);
  };

  return (
    <div className="flex gap-2 items-center justify-center">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" onClick={handleOpen}>
            <MessageCircle className={`hover:text-[${primaryColor}]`} />
            <h1>Comment</h1>
          </Button>
        </DialogTrigger>
        <DialogContent
          className={` ${
            postImage ? "sm:max-w-7xl" : "sm:max-w-3xl"
          }  p-4 max-h-[75vh] overflow-y-auto custom-scrollbar`}
        >
          {loading && (
            <div className="md:w-full md:h-36 flex items-center justify-center">
              <Loader size={25} color={primaryColor} />
            </div>
          )}
          {/* only render this section if there are images and comments */}
          {!loading && comments && postImage && (
            <div className="grid md:grid-cols-7 mt-5">
              <div className="md:col-span-5">
                {postImage && (
                  <div className="relative md:h-full h-[25vh]">
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
                <p className="mt-2">{status}</p>
                <div className="flex items-center justify-between gap-1 mt-2">
                  <LikeButton
                    postId={String(postId)}
                    is_liked_by_user={is_liked_by_current_user}
                    iconSize={15}
                  />
                  <ShareButton postId={String(postId)} />
                </div>

                <CommentForm
                  postId={postId}
                  onCommentSubmit={(comment: any) => {
                    fetchedAndSetComments();
                    //console.log(comment);
                  }}
                />

                <Separator className="mt-2" />

                {<CommentsCard comments={comments} />}
              </div>
            </div>
          )}

          {/* Render comments without image */}
          {!loading && !postImage && (
            <>
              <div className="flex items-center justify-center">
                <div className="w-full">
                  <SubmissionCard
                    profile_picture_url={profile_picture_url}
                    full_name={full_name}
                    postDate={postDate}
                  />
                  <h4 className="px-12 mt-6 mb-6">{status}</h4>

                  <div className="">
                    <Separator className="mt-4" />
                    <div className="flex items-center  gap-1 mt-2">
                      <LikeButton
                        postId={String(postId)}
                        is_liked_by_user={is_liked_by_current_user}
                        iconSize={15}
                      />
                      <ShareButton postId={String(postId)} />
                    </div>

                    <CommentForm
                      postId={postId}
                      onCommentSubmit={(comment: Comment) => {
                        fetchedAndSetComments();
                        //console.log(comment);
                      }}
                    />

                    <Separator className="mt-2" />

                    {<CommentsCard comments={comments} />}
                  </div>
                </div>
              </div>
            </>
          )}
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
