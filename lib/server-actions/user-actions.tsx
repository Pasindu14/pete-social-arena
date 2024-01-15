"use server";

import { supabase } from "@/utils/server";
import ResponseHandler from "../models/response.model";
import { logError } from "../logger";
import { log } from "winston";
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
    const { data, error } = await supabase
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
      .single();

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
  followerId: string
) {
  log(targetUserId, followerId);
  const responseHandler = new ResponseHandler<any>();
  try {
    let { data, error } = await supabase.rpc("update_followers", {
      target_user_id: targetUserId,
      follower_id: followerId,
      is_increment: true,
    });

    if (error) {
      logError(error);
      return responseHandler.setError(
        `Oops! Something went wrong. Please try again !`,
        error.message
      );
    }

    revalidatePath("/profile/user_2Z6sqNjbX7cTZFoV8edkQVOmxHh");
  } catch (error: any) {
    logError(error);
    return responseHandler.setError(
      `Oops! Something went wrong. Please try again !`,
      error
    );
  }
}
