"use client";
import { Button } from "@/components/ui/button";
import {
  fetchFollowStatus,
  updateFollowers,
} from "@/lib/server-actions/user-actions";
import React, { use, useEffect, useState } from "react";

const FollowButton = ({
  targetUserId,
  followerId,
}: {
  targetUserId: string;
  followerId: string;
}) => {
  const [followStatus, setFollowStatus] = useState(false);

  useEffect(() => {
    const getFollowStatus = async () => {
      const result = await fetchFollowStatus(targetUserId, followerId);
      setFollowStatus(result.data == "true" ? true : false);
    };

    getFollowStatus();
  }, []);

  const follow = async () => {
    await updateFollowers(
      targetUserId,
      followerId,
      followStatus ? false : true
    );
    setFollowStatus(!followStatus);
  };
  return (
    <div>
      <Button variant="outline" onClick={follow}>
        {followStatus == true ? "Unfollow" : "Follow"}
      </Button>
    </div>
  );
};

export default FollowButton;
