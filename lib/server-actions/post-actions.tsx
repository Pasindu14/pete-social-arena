"use server";

import Post from "../models/post.model";
import User from "../models/user.model";
import { connectToDB } from "../mongooese";

interface PostParams {
  authorId: string;
  contentType: string | null;
  content: string;
  caption: string | null;
}

export async function createPost({
  authorId,
  contentType,
  content,
  caption,
}: PostParams) {
  try {
    connectToDB();

    console.log(authorId);
    const createdPost = await Post.create({
      author_id: authorId,
      content_type: contentType,
      content: content,
      caption: caption,
    });

    await User.findByIdAndUpdate(authorId, {
      $push: { threads: createdPost._id },
    });
  } catch (error) {
    throw new Error(`Failed to create post: ${error}`);
  }
}
