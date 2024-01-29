"use client";

import { primaryColor } from "@/constants/colors";
import { MessageCircle } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../button";
import { Dialog, DialogContent, DialogFooter, DialogTrigger } from "../dialog";
import Image from "next/image";
import { Separator } from "../separator";
import LikeButton from "../../common/like-button";
import ShareButton from "../../common/share-button";
import CommentForm from "../../common/comment-form";
import UserActivityCard from "../../common/user-activity-card";
import CommentsFeed from "../../common/comments-feed";
import { Loader } from "../../common/loader";

import { fetchCommentsByPost } from "@/lib/server-actions/comment-actions";
import { Comment } from "@/lib/models/comment.model";
import toast from "react-hot-toast";
import CommentButtonInDialog from "../../common/comment-buttonIn-dialog";

const CommentButton = ({
  post,
  commentCallback,
}: {
  post: Post;
  commentCallback?: (count: number) => Promise<void>;
}) => {
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
    if (commentCallback) {
      commentCallback(fetchedComments.length);
    }
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

                {<CommentsFeed comments={comments} post={post} />}
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

                    {<CommentsFeed comments={comments} post={post} />}
                  </div>
                </div>
              </div>
            </>
          )}
          <DialogFooter></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CommentButton;
