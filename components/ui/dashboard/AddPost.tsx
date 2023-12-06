"use client";
import React, { useState, useCallback } from "react";
import { Button } from "../button";
import { BookmarkPlus } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Textarea } from "@/components/ui/textarea";
import { Image, UploadCloud } from "lucide-react";
import { useDropzone } from "react-dropzone";
import Dropzone from "react-dropzone";
import { primaryColor } from "@/constants/colors";

const AddPost = () => {
  const onDrop = useCallback((acceptedFiles: any) => {
    console.log(acceptedFiles);
  }, []);
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState<File[]>();
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="">
            <BookmarkPlus />
            <p className="ml-2 hidden md:block">Post</p>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-xl">
          <div className="grid gap-4 py-4">
            <Textarea placeholder="What's happening?" />
          </div>
          {open && (
            <div className="">
              <div
                className={`border border-${primaryColor} h-20 w-full flex items-center justify-center`}
              >
                <Dropzone
                  onDrop={(acceptedFiles) => {
                    setFiles(acceptedFiles);
                    console.log(acceptedFiles);
                  }}
                >
                  {({ getRootProps, getInputProps }) => (
                    <section>
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />

                        <div className="flex flex-col items-center justify-center p-4">
                          <UploadCloud color={primaryColor} />
                          <p className="text-center">
                            Drag 'n' drop some files here, or click to select
                            files
                          </p>
                        </div>
                      </div>
                    </section>
                  )}
                </Dropzone>
              </div>
            </div>
          )}

          <div className="flex flex-row">
            <Button variant="outline" onClick={() => setOpen(!open)}>
              <Image />
            </Button>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddPost;
