"use client";

import { createComment } from "@/lib/server-actions/comment-actions";
import { useUser } from "@clerk/nextjs";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { SendHorizontal } from "lucide-react";
import toast from "react-hot-toast";
import ResponseHandler from "@/lib/models/response.model";
import { Comment } from "@/lib/models/comment.model";

const CommentForm = ({
  postId,
  onCommentSubmit,
}: {
  postId: string;
  onCommentSubmit: (comment: any) => void;
}) => {
  const { user } = useUser();
  const [comment, setComment] = useState("");
  const [isDisabled, setisDisabled] = useState(true);

  const setCommentText = (text: string) => {
    setComment(text);
    if (text.length > 0) {
      setisDisabled(false);
    } else {
      setisDisabled(true);
    }
  };

  const submitComment = async () => {
    const response = (await createComment({
      userId: user?.id!,
      comment: comment,
      parentCommentId: null,
      postId: postId,
    })) as ResponseHandler<Comment>;

    if (response?.success === false) {
      toast.error(response.message);
    } else {
      onCommentSubmit(response.data);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-2 mt-2 rounded-sm">
        <Input
          type="text"
          placeholder="Write a comment"
          className="p-2"
          onChange={(e) => setCommentText(e.target.value)}
        />
        <Button onClick={submitComment} disabled={isDisabled}>
          <SendHorizontal size={15} />
        </Button>
      </div>
    </div>
  );
};

export default CommentForm;
