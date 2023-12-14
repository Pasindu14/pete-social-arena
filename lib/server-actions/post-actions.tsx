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
      author: authorId,
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

export async function fetchPosts(userId: string) {
  try {
    connectToDB();

    const posts = await Post.aggregate([
      { $limit: 10 },
      {
        $addFields: {
          isLikedByCurrentUser: { $in: [userId, "$likes_by"] },
        },
      },
      {
        $lookup: {
          from: "users", // the collection to join
          localField: "author", // field from the input documents
          foreignField: "_id", // field from the documents of the "from" collection
          as: "authorDetails", // output array field
        },
      },
      { $unwind: "$authorDetails" }, // Deconstructs the 'authorDetails' array
    ]).exec();

    return posts.map((post) => ({
      ...post,
      author: post.authorDetails,
      // Remove the authorDetails field if not needed
    }));
  } catch (error) {
    throw new Error(`Failed to create post: ${error}`);
  }
}

export async function addLikes(userId: string, postId: string) {
  try {
    connectToDB();

    const postsUpdate = await Post.findByIdAndUpdate(
      { _id: postId },
      {
        $inc: {
          likes_count: 1,
        },
        $push: { likes_by: userId },
      }
    );
    console.log(postsUpdate);
  } catch (error) {
    throw new Error(`Failed to create post: ${error}`);
  }
}
