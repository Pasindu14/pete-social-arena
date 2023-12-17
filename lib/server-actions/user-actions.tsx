"use server";

import { supabase } from "@/utils/server";
import ResponseHandler from "../models/response.model";

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
