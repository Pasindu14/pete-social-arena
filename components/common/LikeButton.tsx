"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { ThumbsUp } from "lucide-react";
import { primaryColor, secondaryColor } from "@/constants/colors";
import { addLikes } from "@/lib/server-actions/post-actions";
import toast from "react-hot-toast";
import { useUser } from "@clerk/nextjs";
import { set } from "mongoose";

interface LikeProps {
  postId: string;
  is_liked_by_user: boolean;
  iconSize: number;
  likeCallback?: (isLiked: boolean) => Promise<void>;
}

const LikeButton = ({
  postId,
  is_liked_by_user,
  iconSize,
  likeCallback,
}: LikeProps) => {
  const { user } = useUser();
  const [isLiked, setIsLiked] = useState(is_liked_by_user);
  const [isLoading, setIsLoading] = useState(false);

  const likePressed = async () => {
    setIsLoading(true);
    try {
      const response = await addLikes(user?.id!, postId, !isLiked);
      if (response?.error) {
        toast.error(
          `Oops! Something went wrong. Please try again ! ${response.error}`
        );
        return;
      }
      if (likeCallback) {
        likeCallback(!isLiked);
        setIsLiked(!isLiked);
      }
    } catch (error) {
      toast.error("Oops! Something went wrong. Please try again !");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Button
        onClick={likePressed}
        disabled={isLoading}
        variant="outline"
        className="border-none"
      >
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
