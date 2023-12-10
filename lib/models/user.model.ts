import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, },
    id: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    full_name: { type: String, required: true },
    profile_picture_url: String,
    registration_date: { type: Date, default: Date.now },
    bio: String,
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ]
});

delete mongoose.models.User;

const User = mongoose.model("User", userSchema);

export default User;


