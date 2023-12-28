/**
 * ShareButton component displays a button that opens a dialog for sharing a post.
 *
 * It takes a postId prop and generates a shareable URL for that post.
 * Renders a Dialog with the post URL that can be copied to the clipboard.
 * Uses React state and effects to update the URL on prop change.
 * Handles click to copy URL and show success toast notification.
 */
"use client";

import { primaryColor } from "@/constants/colors";
import { Copy, Share2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import toast from "react-hot-toast";

const ShareButton = ({ postId }: { postId: string }) => {
  const [currentUrl, setCurrentUrl] = useState<string | null>(null);
  useEffect(() => {
    setCurrentUrl(window.location.origin + "/post/" + `${postId}`);
  }, [postId]);

  const copyButtonPressed = () => {
    navigator.clipboard.writeText(currentUrl!);
    toast.success("Link copied to clipboard!");
  };

  return (
    <div className="flex gap-2 items-center justify-center">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="border-none">
            <Share2 className={`hover:text-[${primaryColor}]`} />
            <h1>Share</h1>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Share</DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-8 items-center gap-4">
            <Input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-7"
              value={currentUrl ? currentUrl : ""}
              disabled
            />
            <Button
              onClick={copyButtonPressed}
              variant="outline"
              className="col-span-1"
            >
              <div className="flex gap-1 items-center justify-center">
                <Copy className={`hover:text-[${primaryColor}]`} size={20} />
              </div>
            </Button>
          </div>

          <DialogFooter></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ShareButton;
