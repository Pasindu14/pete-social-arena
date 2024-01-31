"use client";
import React, { useState } from "react";
import { Button } from "../../../../components/ui/button";
import { BookmarkPlus, Delete } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Textarea } from "@/components/ui/textarea";
import { Image, UploadCloud } from "lucide-react";
import Dropzone from "react-dropzone";
import { loaderColor, primaryColor } from "@/constants/colors";
import { createPost } from "@/lib/server-actions/post-actions";
import { getUserId } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../../../components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { PostValidation } from "@/lib/validation/post";
import { useUploadThing } from "@/utils/uploadthing";
import toast from "react-hot-toast";
import { Loader } from "@/components/common/loader";
import { useUser } from "@clerk/nextjs";

const AddPost = () => {
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState<File[]>();
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      status: "",
    },
  });

  const { startUpload } = useUploadThing("imageUploader", {
    onClientUploadComplete: () => {},
  });

  const onRemoveClick = () => {
    setFiles([]);
  };

  async function onSubmit(values: z.infer<typeof PostValidation>) {
    try {
      let uploadImageUrl = "";
      setSubmitting(true);
      if (files?.length) {
        const uploadResult = await startUpload([files![0]]);
        uploadImageUrl = uploadResult?.length ? uploadResult[0].url : "";
      }

      const data = {
        authorId: user?.id!,
        contentType: uploadImageUrl != "" ? "image" : "text",
        imageUrl: uploadImageUrl,
        status: values.status,
      };
      const result = await createPost(data);

      if (!result.success) {
        toast.error("Failed to create the post. Please try again.");
        return;
      }

      toast.success("Succesfully created the post");
      form.reset();
      setFiles([]);
    } catch (error) {
      toast.error("Failed to create the post. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="">
            <BookmarkPlus />
            <p className="ml-2 hidden md:block">Post</p>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-xl py-12">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea placeholder="What's happening?" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {open && (
                <div className="">
                  {/* Files */}
                  <div>
                    {files && (
                      <>
                        {files.map((file) => {
                          return (
                            <div className="flex items-center justify-between gap-2 p-2 border border-1 border-gray-300 rounded-none">
                              <div> {file.name} </div>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={onRemoveClick}
                              >
                                Remove
                              </Button>
                            </div>
                          );
                        })}
                      </>
                    )}
                  </div>

                  <div
                    className={`border border-${primaryColor} h-20 w-full flex items-center justify-center mt-2`}
                  >
                    <Dropzone
                      onDrop={(acceptedFiles) => {
                        setFiles(acceptedFiles);
                      }}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <section>
                          <div {...getRootProps()}>
                            <input {...getInputProps()} />

                            <div className="flex flex-col items-center justify-center p-4">
                              <UploadCloud color={primaryColor} />
                              <p className="text-center">
                                Drag 'n' drop some files here, or click to
                                select files
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
                <Button
                  variant="outline"
                  onClick={() => setOpen(!open)}
                  type="button"
                >
                  <Image />
                </Button>
              </div>

              <DialogFooter>
                <div>
                  <Button type="submit" disabled={submitting}>
                    {submitting == true ? (
                      <div className="flex items-center justify-center gap-2">
                        <p>Save changes</p>
                        <Loader size={13} color={loaderColor} />
                      </div>
                    ) : (
                      "Save changes"
                    )}
                  </Button>
                </div>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddPost;
