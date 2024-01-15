"use client";
import { Button } from "@/components/ui/button";
import { updateFollowers } from "@/lib/server-actions/user-actions";
import React from "react";

const FollowButton = ({
  targetUserId,
  followerId,
}: {
  targetUserId: string;
  followerId: string;
}) => {
  const follow = async () => {
    const result = await updateFollowers(targetUserId, followerId);
    console.log(result);
  };
  return (
    <div>
      <Button variant="outline" onClick={follow}>
        Follow
      </Button>
    </div>
  );
};

export default FollowButton;
