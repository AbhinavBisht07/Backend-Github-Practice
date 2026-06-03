const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    caption: {
        type: String,
        default: ""
    },
    imageUrl: {
        type: String,
        required: [true, "imageUrl is required for creating a post."]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true, "user ID is required for creating a post."]
    }
}, {timestamps: true})


const postModel = mongoose.model("posts", postSchema);

module.exports = postModel