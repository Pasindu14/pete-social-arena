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
    const { error } = await supabase
      .from("comments")
      .insert([
        {
          user_id: userId,
          post_id: postId,
          comment: comment,
          parent_comment_id: parentCommentId,
        },
      ])
      .select();

    if (error != null) {
      return responseHandler.setError(
        `Oops! Something went wrong. Please try again !`,
        error.message
      );
    }
    1;
  } catch (error: any) {
    return responseHandler.setError(
      `Oops! Something went wrong. Please try again !`,
      error.message
    );
  }
}

export async function fetchCommentsByPost(postId: string) {
  try {
    let { data: comments } = await supabase.rpc("get_comments_details", {
      param_post_id: postId,
    });

    console.log("first 10 comments fetched");
    await new Promise((resolve) => setTimeout(resolve, 10000));
    return comments;
  } catch (error) {
    return [];
  }
}
