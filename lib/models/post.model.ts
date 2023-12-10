import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId, auto: true }, // Automatically generated unique identifier
    author_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the User Collection
    content_type: { type: String, enum: ["image", "text"], required: true }, // e.g., "image" or "text"
    content: { type: String, required: true }, // URL of the image or the text content
    caption: String, // Optional, used for image posts
    post_date: { type: Date, default: Date.now } // Date of the post
});

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);

export default Post;
