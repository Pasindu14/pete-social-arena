"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { ThumbsUp } from "lucide-react";
import { primaryColor, secondaryColor } from "@/constants/colors";
import { addLikes } from "@/lib/server-actions/post-actions";
import toast from "react-hot-toast";
import { useUser } from "@clerk/nextjs";

interface LikeProps {
  postId: string;
  is_liked_by_user: boolean;
  iconSize: number;
}

const LikeButton = ({ postId, is_liked_by_user, iconSize }: LikeProps) => {
  const { user } = useUser();
  const [isLiked, setIsLiked] = useState(is_liked_by_user);
  const likePressed = async () => {
    try {
      setIsLiked(!isLiked);
      const response = await addLikes(user?.id!, postId, !isLiked);
      if (response?.error) {
        toast.error(
          `Oops! Something went wrong. Please try again ! ${response.error}`
        );
      }
    } catch (error) {
      toast.error("Oops! Something went wrong. Please try again !");
    }
  };

  return (
    <div>
      <Button onClick={likePressed} variant="outline">
        <div className="flex gap-2 items-center justify-center">
          <ThumbsUp
            color={`${isLiked === true ? primaryColor : secondaryColor}`}
            className={`hover:text-[${primaryColor}]`}
            size={iconSize}
          />
          <h1 className={`${isLiked === true ? `text-[${primaryColor}]` : ""}`}>
            Like
          </h1>
        </div>
      </Button>
    </div>
  );
};

export default LikeButton;
