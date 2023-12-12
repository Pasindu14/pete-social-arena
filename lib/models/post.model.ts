import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    author_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the User Collection
    content_type: { type: String, enum: ["image", "text"], required: true }, // e.g., "image" or "text"
    image_url: { type: String }, // URL of the image or the text content
    status: { type: String, require: true }, // Optional, used for image posts
    post_date: { type: Date, default: Date.now } // Date of the post
});

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);

export default Post;
