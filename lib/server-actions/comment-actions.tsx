"use server";

import { supabase, supabaseCacheFreeClient } from "@/utils/server";
import ResponseHandler from "../models/response.model";
import { createClient } from "@supabase/supabase-js";
import { createNotification } from "./notification-actions";
import { addComments } from "./post-actions";

interface CommentParams {
  userId: string;
  postId: string;
  parentCommentId: string | null;
  comment: string;
  postAuthor: string;
}

export async function createComment({
  userId,
  postId,
  parentCommentId,
  comment,
  postAuthor,
}: CommentParams) {
  const responseHandler = new ResponseHandler<any>();
  try {
    const { data, error } = await supabase
      .from("comments")
      .insert({
        user_id: userId,
        post_id: postId,
        comment: comment,
        parent_comment_id: parentCommentId,
      })
      .select();

    createNotification({
      notificationType: "comment",
      referenceId: postId,
      referenceAuthorId: postAuthor,
      publisherId: userId,
    });

    await addComments(postId, 1);

    if (error != null) {
      return responseHandler.setError(
        `Oops! Something went wrong. Please try again !`,
        error.message
      );
    }
    return responseHandler.setSuccess(
      "Your comment has been posted successfully.",
      { comment: data[0] }
    );
  } catch (error: any) {
    return responseHandler.setError(
      `Oops! Something went wrong. Please try again !`,
      error.message
    );
  }
}

export async function fetchCommentsByPost(postId: string) {
  try {
    let { data: comments } = await supabaseCacheFreeClient.rpc(
      "get_comments_details",
      {
        param_post_id: postId,
      }
    );
    return comments;
  } catch (error) {
    return [];
  }
}
