"use client";

import { primaryColor } from "@/constants/colors";
import { MessageCircle } from "lucide-react";
import React, { Suspense, useEffect, useRef, useState } from "react";
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
import CommentForm from "./CommentForm";
import UserActivityCard from "./SubmissionCard";
import CommentsCard from "./CommentsCard";
import CommentButton from "./CommentButton";
import { Loader, LoaderFull } from "./Loader";

import { fetchCommentsByPost } from "@/lib/server-actions/comment-actions";
import { revalidatePath } from "next/cache";
import { Comment } from "@/lib/models/comment.model";
import toast from "react-hot-toast";
import CommentButtonInDialog from "./CommentButtonInDialog";

const CommentSection = ({ post }: { post: Post }) => {
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState<Comment[] | null>([]);
  const [focusCommentInput, setFocusCommentInput] = useState(false);

  const handleCommentButtonClick = () => {
    setFocusCommentInput(!focusCommentInput);
  };

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
    const fetchedComments = await fetchCommentsByPost(post.postId);
    setComments(fetchedComments);
  };

  return (
    <div className="flex gap-2 items-center justify-center">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            onClick={handleOpen}
            className="border-none"
          >
            <MessageCircle className={`hover:text-[${primaryColor}]`} />
            <h1>Comment</h1>
          </Button>
        </DialogTrigger>
        <DialogContent
          className={` ${
            post.postImage ? "sm:max-w-7xl" : "sm:max-w-3xl"
          }  p-4 max-h-[75vh] overflow-y-auto custom-scrollbar`}
        >
          {loading && (
            <div className="md:w-full md:h-36 flex items-center justify-center">
              <Loader size={25} color={primaryColor} />
            </div>
          )}
          {/* only render this section if there are images and comments */}
          {!loading && comments && post.postImage && (
            <div className="grid md:grid-cols-7 mt-5">
              <div className="md:col-span-5">
                {post.postImage && (
                  <div className="relative md:h-full h-[25vh]">
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
              </div>
              <div className="md:col-span-2 md:p-6 p-2 ">
                <UserActivityCard
                  postDate={post.postDate}
                  user={post.author}
                  full_name={post.full_name}
                  profile_picture_url={post.profile_picture_url}
                />
                <Separator className="mt-4" />
                <p className="mt-2">{post.status}</p>
                <div className="flex items-center justify-between gap-1 mt-2">
                  <LikeButton
                    postId={String(post.postId)}
                    is_liked_by_user={post.is_liked_by_current_user}
                    iconSize={15}
                  />
                  <CommentButtonInDialog
                    onButtonClick={handleCommentButtonClick}
                  />
                  <ShareButton postId={String(post.postId)} />
                </div>

                <CommentForm
                  postId={post.postId}
                  author={post.author}
                  onCommentSubmit={(comment: any) => {
                    fetchedAndSetComments();
                  }}
                  autoFocus={focusCommentInput}
                />

                <Separator className="mt-2" />

                {<CommentsCard comments={comments} post={post} />}
              </div>
            </div>
          )}

          {/* Render comments without image */}
          {!loading && !post.postImage && (
            <>
              <div className="flex items-center justify-center">
                <div className="w-full">
                  <UserActivityCard
                    postDate={post.postDate}
                    user={post.author}
                    full_name={post.full_name}
                    profile_picture_url={post.profile_picture_url}
                  />
                  <h4 className="px-12 mt-6 mb-6">{post.status}</h4>

                  <div className="">
                    <Separator className="mt-4" />
                    <div className="flex items-center  gap-1 mt-2">
                      <LikeButton
                        postId={String(post.postId)}
                        is_liked_by_user={post.is_liked_by_current_user}
                        iconSize={15}
                      />

                      <CommentButtonInDialog
                        onButtonClick={handleCommentButtonClick}
                      />
                      <ShareButton postId={String(post.postId)} />
                    </div>

                    <CommentForm
                      postId={post.postId}
                      author={post.author}
                      onCommentSubmit={(comment: Comment) => {
                        fetchedAndSetComments();
                      }}
                      autoFocus={focusCommentInput}
                    />

                    <Separator className="mt-2" />

                    {<CommentsCard comments={comments} post={post} />}
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
