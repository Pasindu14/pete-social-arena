"use server";

import { clerkClient, currentUser } from "@clerk/nextjs";
import User from "../models/user.model";
import { connectToDB } from "../mongooese";

export async function updateUser(
  userId: string,
  email: string,
  fullName: string,
  profilePictureUrl: string,
  bio: string
) {
  connectToDB();

  try {
    const user = await User.findOneAndUpdate(
      { _id: userId },
      {
        _id: userId,
        id: userId,
        email: email,
        full_name: fullName,
        profile_picture_url: profilePictureUrl,
        bio: bio,
      },
      {
        upsert: true,
        new: true,
      }
    );

    const params = { externalId: user?._id?.toString() };
    await clerkClient.users.updateUser(userId, params);
    //console.log(usersad);
    //console.log(asdsad);

    return {
      status: "success",
      message: "User updated successfully",
      data: user?._id?.toString(),
    };
  } catch (error: any) {
    return {
      status: "error",
      message: `Failed to update user: ${error.message}`,
    };
  }
}

export async function fetchUser(userId: string) {
  try {
    connectToDB();
    return await User.findOne({ id: userId });
  } catch (error) {
    throw new Error(`Failed to fetch user: ${error}`);
  }
}
