import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the User Collection
    content_type: { type: String, enum: ["image", "text"], required: true }, // e.g., "image" or "text"
    image_url: { type: String }, // URL of the image or the text content
    status: { type: String, require: true }, // Optional, used for image posts
    post_date: { type: Date, default: Date.now },// Date of the post
    likes_count: { type: Number, default: 0 },
    comments_count: { type: Number, default: 0 },
    share_count: { type: Number, default: 0 },
    likes_by: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    comments_by: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    shared_by: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
});

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);

export default Post;
