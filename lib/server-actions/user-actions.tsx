"use server";

import User from "../models/user.model";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../mongooese";
import { cookies } from "next/headers";

export async function updateUser(
  userId: string,
  username: string,
  name: string,
  bio: string,
  image: string,
  path: string
): Promise<void> {
  connectToDatabase();

  cookies().set("name", userId);

  try {
    await User.findOneAndUpdate(
      { id: userId },
      {
        username: username.toLowerCase(),
        name,
        bio,
        image,
        path,
        onboard: true,
      },
      {
        upsert: true,
      }
    );

    /*     if (path === "/profile/edit") {
      revalidatePath(path);
    } */
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
}
