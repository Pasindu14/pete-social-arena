"use client";
import React from "react";
import { Button } from "../ui/button";
import { ThumbsUp } from "lucide-react";
import { primaryColor } from "@/constants/colors";
import { getUserId } from "@/lib/utils";
import { addLikes } from "@/lib/server-actions/post-actions";
import toast from "react-hot-toast";

interface LikeProps {
  postId: string;
}

const LikeButton = ({ postId }: LikeProps) => {
  const userId = getUserId();
  const likePressed = () => {
    try {
      addLikes(userId!, postId);
    } catch (error) {
      toast.error("Oops! Something went wrong. Please try again !");
    }
  };

  return (
    <div>
      <Button onClick={likePressed} variant="ghost">
        <div className="flex gap-2 items-center justify-center">
          <ThumbsUp className={`hover:text-[${primaryColor}]`} />
          <h1>Like</h1>
        </div>
      </Button>
    </div>
  );
};

export default LikeButton;
