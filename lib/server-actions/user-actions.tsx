"use server";

import { supabase, supabaseCacheFreeClient } from "@/utils/server";
import ResponseHandler from "../models/response.model";
import { logError } from "../logger";
import { revalidatePath } from "next/cache";

export async function updateUser(
  userId: string,
  email: string,
  fullName: string,
  profilePictureUrl: string,
  bio: string
) {
  const responseHandler = new ResponseHandler<any>();
  try {
    const { data, error } = await supabaseCacheFreeClient
      .from("user")
      .upsert([
        {
          id: userId,
          email: email,
          full_name: fullName,
          profile_picture_url: profilePictureUrl,
          bio: bio,
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

    return responseHandler.setSuccess(
      `User updated successfully`,
      data?.toString()
    );
  } catch (error: any) {
    return responseHandler.setError(
      `Oops! Something went wrong. Please try again !`,
      error.message
    );
  }
}

export async function getUserDetails(
  userId: string
): Promise<{ success: boolean; message: string; data?: any; error?: any }> {
  const responseHandler = new ResponseHandler<any>();
  try {
    const { data, error } = await supabase
      .from("user")
      .select("*")
      .eq("id", userId)
      .maybeSingle();

    if (error != null) {
      logError(error);
      return responseHandler.setError(
        `Oops! Something went wrong while fetching user details. Please try again!`,
        error.message
      );
    }

    return responseHandler.setSuccess(
      `User details fetched successfully`,
      data
    );
  } catch (error: any) {
    logError(error);
    return responseHandler.setError(
      `Oops! Something went wrong while fetching user details. Please try again!`,
      error.message
    );
  }
}

export async function updateFollowers(
  targetUserId: string,
  followerId: string,
  is_increment: boolean
) {
  const responseHandler = new ResponseHandler<any>();
  try {
    let { error } = await supabaseCacheFreeClient.rpc("update_followers", {
      target_user_id: targetUserId,
      follower_id: followerId,
      is_increment: is_increment,
    });

    if (error) {
      logError(error);
      return responseHandler.setError(
        `Oops! Something went wrong. Please try again !`,
        error.message
      );
    }
    revalidatePath(`/profile/${followerId}`);
    revalidatePath(`/profile/${targetUserId}`);
  } catch (error: any) {
    logError(error);
    return responseHandler.setError(
      `Oops! Something went wrong. Please try again !`,
      error
    );
  }
}

export async function fetchFollowStatus(
  targetUser: string,
  loggedInUser: string
): Promise<{ success: boolean; message: string; data?: any; error?: any }> {
  const responseHandler = new ResponseHandler<any>();

  try {
    let { data, error } = await supabaseCacheFreeClient.rpc(
      "check_user_follow_status",
      {
        target_user_id: targetUser,
        logged_in_user_id: loggedInUser,
      }
    );

    if (error) {
      logError(error);
      return responseHandler.setError(
        `Oops! Something went wrong. Please try again !`,
        error.message
      );
    }

    return responseHandler.setSuccess(
      `Succefully retrieved follow status`,
      data.toString()
    );
  } catch (error: any) {
    logError(error);
    return responseHandler.setError(
      `Oops! Something went wrong. Please try again !`,
      error
    );
  }
}

export async function fetchUsersByName(filter: string) {
  console.log(filter);
  let { data: users, error } = await supabaseCacheFreeClient
    .from("user")
    .select("*")
    .ilike("full_name", `%${filter}%`);

  if (error != null) {
    logError(error);
    return [];
  }

  return users ?? [];
}

export async function updateBio(userId: string, bio: string) {
  const responseHandler = new ResponseHandler<any>();
  try {
    const { data, error } = await supabaseCacheFreeClient
      .from("user")
      .update({ bio: bio })
      .eq("id", userId)
      .select();

    if (error) {
      logError(error);
      return responseHandler.setError(
        `Oops! Something went wrong. Please try again !`,
        error.message
      );
    }
    revalidatePath(`/profile/${userId}`);
    return responseHandler.setSuccess("Bio updated successfully", data);
  } catch (error: any) {
    logError(error);
    return responseHandler.setError(
      `Oops! Something went wrong. Please try again !`,
      error
    );
  }
}
