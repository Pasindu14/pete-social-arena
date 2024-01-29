"use client";
import { Loader } from "@/components/common/loader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { loaderColor } from "@/constants/colors";
import { updateBio } from "@/lib/server-actions/user-actions";
import { Edit } from "lucide-react";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const EditBioDialog = ({ bio, id }: { bio: string; id: string }) => {
  const maxWordCount = 55;
  const [newBio, setNewBio] = useState(bio);
  const [isSubittingSuccess, setIsSubmittingSuccess] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const countWords = (bio: string) => {
      const words = bio.split(" ");
      setWordCount(maxWordCount - words.length);
    };
    countWords(bio);
  }, [bio]);

  const update = async () => {
    setSubmitting(true);
    setIsSubmittingSuccess(false);
    const result = await updateBio(id, newBio);
    if (result.success == true) {
      toast.success("Bio updated successfully");
      setIsSubmittingSuccess(true);
    }
    setSubmitting(false);
  };
  const handleBioChange = (e: any) => {
    const words = e.target.value.split(" ");
    const difference = maxWordCount - words.length;
    setNewBio(e.target.value);
    setWordCount(difference);
  };

  return (
    <div className="w-full h-full flex justify-between">
      <Dialog>
        <DialogTrigger>
          <div className="flex items-start justify-start gap-6">
            <p className={`text-justify ${bio ? "block" : "hidden"}`}>
              {isSubittingSuccess == true ? newBio : bio}
            </p>
            <div className="flex items-start justify-start gap-2">
              <Edit className="md:w-[15px] md:h-[15px] h-[10px] w-[10px]" />
            </div>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <div className="flex flex-col gap-4">
              <DialogTitle>Edit bio</DialogTitle>
              <Textarea
                placeholder="Type your message here."
                className="h-32"
                onChange={handleBioChange}
                value={newBio}
              />
              <p className="text-sm text-muted-foreground">{`${wordCount} remaining`}</p>

              <div>
                <Button
                  type="button"
                  onClick={update}
                  disabled={submitting || wordCount < 0}
                  className="w-full"
                >
                  {submitting == true ? (
                    <div className="flex items-center justify-center gap-2">
                      <p>Update</p>
                      <Loader size={13} color={loaderColor} />
                    </div>
                  ) : (
                    "Update"
                  )}
                </Button>
              </div>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditBioDialog;
