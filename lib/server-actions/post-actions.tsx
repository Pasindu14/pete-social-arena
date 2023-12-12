"use server";

import Post from "../models/post.model";
import User from "../models/user.model";
import { connectToDB } from "../mongooese";

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
  try {
    connectToDB();
    const createdPost = await Post.create({
      author_id: authorId,
      content_type: contentType,
      image_url: imageUrl,
      status: status,
    });
    await User.findByIdAndUpdate(authorId, {
      $push: { posts: createdPost._id },
    });
  } catch (error) {
    throw new Error(`Failed to create post: ${error}`);
  }
}
