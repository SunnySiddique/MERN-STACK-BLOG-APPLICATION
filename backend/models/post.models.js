const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: [
        "Agriculture",
        "Business",
        "Education",
        "Entertainment",
        "Art",
        "Investment",
        "Uncategorized",
        "Weather",
        "Lifestyle",
        "Health & Wellness",
        "Personal Development",
        "Travel",
        "Home & Decor",
      ],
      message: `Value isn't supported`,
    },
    description: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Post = new mongoose.model("Post", postSchema);

module.exports = Post;
