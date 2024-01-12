import { Button } from "@/components/ui/button";
import React from "react";

const FollowSection = ({ user }: { user: any }) => {
  return (
    <div className="flex flex-row gap-4">
      <Button> {user.data.followers} Follow</Button>
      <Button>{user.data.following} Following</Button>
    </div>
  );
};

export default FollowSection;
