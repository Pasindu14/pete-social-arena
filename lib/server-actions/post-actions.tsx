"use server";

import { supabase } from "@/utils/server";
import ResponseHandler from "../models/response.model";
import { logError } from "../logger";

interface PostParams {
  authorId: string;
  contentType: string | null;
  imageUrl: string | null;
  status: string;
}

export async function createPost({
  authorId,
  contentType,
  imageUrl,
  status,
}: PostParams) {
  const responseHandler = new ResponseHandler<any>();
  try {
    const { error } = await supabase
      .from("post")
      .insert([
        {
          author: authorId,
          content_type: contentType,
          image_url: imageUrl,
          status: status,
          likes_by: [],
        },
      ])
      .select();

    if (error != null) {
      logError(error);
      return responseHandler.setError(
        `Oops! Something went wrong. Please try again !`,
        error.message
      );
    }
  } catch (error: any) {
    logError(error);
    return responseHandler.setError(
      `Oops! Something went wrong. Please try again !`,
      error.message
    );
  }
}

export async function fetchPosts(userId: string) {
  try {
    let { data: posts, error } = await supabase.rpc(
      "get_posts_with_author_details",
      {
        check_user_id: userId,
      },
      {
        count: "exact",
      }
    );

    if (error) {
      logError(error);
      return [];
    }
    return posts;
  } catch (error) {
    return [];
  }
}

export async function fetchPostsByUser(userId: string) {
  try {
    let { data: posts, error } = await supabase.rpc("get_posts_by_user", {
      check_user_id: userId,
    });
    if (error) {
      logError(error);
      return [];
    }

    return posts;
  } catch (error) {
    return [];
  }
}

export async function addLikes(
  userId: string,
  postId: string,
  is_increment: boolean
) {
  const responseHandler = new ResponseHandler<any>();
  try {
    let { error } = await supabase.rpc("update_post_and_modify_user", {
      post_id: postId,
      table_name: "post",
      increment_field_name: "likes_count",
      array_column_name: "likes_by",
      user_id: userId,
      is_increment: is_increment,
    });
    if (error) {
      logError(error);
      return responseHandler.setError(
        `Oops! Something went wrong. Please try again !`,
        error.message
      );
    }
  } catch (error: any) {
    logError(error);
    return responseHandler.setError(
      `Oops! Something went wrong. Please try again !`,
      error
    );
  }
}

export async function addComments(postId: string, increment_by: number) {
  const responseHandler = new ResponseHandler<any>();
  try {
    let { data, error } = await supabase.rpc("update_post_comments", {
      post_id: postId,
      increment_by: increment_by,
    });

    if (error) {
      logError(error);
      return responseHandler.setError(
        `Oops! Something went wrong. Please try again !`,
        error.message
      );
    }
  } catch (error: any) {
    logError(error);
    return responseHandler.setError(
      `Oops! Something went wrong. Please try again !`,
      error
    );
  }
}
