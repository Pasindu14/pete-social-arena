"use client";

import { primaryColor } from "@/constants/colors";
import { MessageCircle, Share2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const ShareButton = ({ postId }: { postId: string }) => {
  const router = useRouter();

  const commentPressed = () => {
    router.push(`/post/${postId}`);
  };

  return (
    <div className="flex gap-2 items-center justify-center">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Share2 className={`hover:text-[${primaryColor}]`} />
            <h1>Share</h1>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-5xl">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                defaultValue="Pedro Duarte"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input
                id="username"
                defaultValue="@peduarte"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ShareButton;
