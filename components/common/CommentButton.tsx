"use client";
import { primaryColor } from "@/constants/colors";
import { MessageCircle } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { fetchCommentsByPost } from "@/lib/server-actions/comment-actions";
import CommentSection from "./CommentSection";
import Test from "./Test";

interface CommentProps {
  postId: string;
  postDate: Date;
  postImage: string;
  status: string;
  profile_picture_url: string;
  full_name: string;
  is_liked_by_current_user: boolean;
}

const CommentButton = ({
  postId,
  postDate,
  postImage,
  status,
  profile_picture_url,
  full_name,
  is_liked_by_current_user,
}: CommentProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <div className="flex gap-2 items-center justify-center">
      <Button variant="outline" onClick={() => setIsDialogOpen(true)}>
        <MessageCircle className={`hover:text-[${primaryColor}]`} />
        <h1>Comment</h1>
      </Button>

      {isDialogOpen && (
        <CommentSection
          postId={String(postId)}
          postDate={postDate}
          postImage={postImage}
          status={status}
          profile_picture_url={profile_picture_url}
          full_name={full_name}
          is_liked_by_current_user={is_liked_by_current_user}
          dialogOpen={isDialogOpen}
        />
      )}
    </div>
  );
};

export default CommentButton;
