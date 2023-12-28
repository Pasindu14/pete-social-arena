"use client";
import React from "react";
import { Button } from "../ui/button";
import { MessageCircle } from "lucide-react";
import { primaryColor } from "@/constants/colors";

const CommentButtonInDialog = ({
  onButtonClick,
}: {
  onButtonClick: () => void;
}) => {
  return (
    <div>
      <Button onClick={onButtonClick} variant="outline" className="border-none">
        <div className="flex gap-2 items-center justify-center">
          <MessageCircle className={`hover:text-[${primaryColor}]`} />
          <h1>Comment</h1>
        </div>
      </Button>
    </div>
  );
};

export default CommentButtonInDialog;
