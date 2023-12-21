"use server";

import { supabase } from "@/utils/server";
import ResponseHandler from "../models/response.model";

interface CommentParams {
  userId: string;
  postId: string;
  parentCommentId: string | null;
  comment: string;
}

export async function createComment({
  userId,
  postId,
  parentCommentId,
  comment,
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
    let { data: comments, error } = await supabase.rpc("get_comments_details", {
      param_post_id: postId,
    });

    return comments;
  } catch (error) {
    return [];
  }
}
