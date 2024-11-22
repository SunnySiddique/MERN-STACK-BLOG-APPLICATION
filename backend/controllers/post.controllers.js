const HttpError = require("../models/error.models");
const Post = require("../models/post.models");
const User = require("../models/user.models");
const cloudinary = require("cloudinary").v2;

// get all posts
const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    next(new HttpError("Failed to fetch posts", 500));
  }
};

// get single post
const getPost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const post = await Post.findOne({ _id: postId });

    if (!post) {
      next(new HttpError("Post not found", 404));
    }
    res.status(200).json(post);
  } catch (error) {
    next(new HttpError("Failed to fetch post", 500));
  }
};

// get single post
const getCatPosts = async (req, res, next) => {
  try {
    const { category } = req.params;
    const catPosts = await Post.find({ category }).sort({ createdAt: -1 });
    res.status(200).json(catPosts);
  } catch (error) {
    next(new HttpError(error));
  }
};

// get authors
const getUserPosts = async (req, res, next) => {
  try {
    const { id } = req.params;
    const posts = await Post.find({ creator: id }).sort({ createdAt: -1 });
    if (posts.length === 0) {
      return next(new HttpError("User has no posts", 404));
    }
    const user = await User.findById(id);

    if (!user) {
      next(new HttpError("user not found", 404));
    }

    res.status(200).json(posts);
  } catch (error) {
    next(new HttpError("Failed to fetch post", 500));
  }
};

const createPost = async (req, res, next) => {
  try {
    let { title, category, description, thumbnail } = req.body;
    const userId = req.user._id;

    // Ensure all fields are provided
    if (!title || !category || !description || !thumbnail) {
      return next(new HttpError("Please fill in all fields", 422));
    }

    if (description.length < 150) {
      return next(
        new HttpError("Description must be at least 150 characters", 422)
      );
    }

    if (thumbnail) {
      const uploadedRes = await cloudinary.uploader.upload(thumbnail, {
        folder: "blog-thumbnails",
      });
      thumbnail = uploadedRes.secure_url;
    }

    // Create the post
    const newPost = await Post.create({
      title,
      category,
      description,
      thumbnail,
      creator: userId,
    });

    if (!newPost) {
      return next(new HttpError("Failed to create the post", 500));
    }

    // Update the user with the new post count
    await User.findByIdAndUpdate(userId, { $inc: { posts: 1 } });

    res.status(201).json(newPost);
  } catch (error) {
    next(new HttpError(error));
  }
};

// edit post
const editPost = async (req, res, next) => {
  try {
    const { title, category, description, thumbnail } = req.body;
    const postId = req.params.id;

    if (!title && !category && !description && !thumbnail) {
      return next(
        new HttpError("At least one field is required to update", 400)
      );
    }

    const post = await Post.findById(postId);
    if (!post) {
      return next(new HttpError("Post not found", 404));
    }

    const updatedData = {};
    if (title && post.title !== title) updatedData.title = title;
    if (category && post.category !== category) updatedData.category = category;
    if (description && post.description !== description)
      updatedData.description = description;

    if (thumbnail) {
      // Upload to Cloudinary
      const uploadedRes = await cloudinary.uploader.upload(thumbnail, {
        folder: "blog-thumbnails", // optional, you can specify a folder
      });

      // Store the URL of the uploaded image from Cloudinary
      updatedData.thumbnail = uploadedRes.secure_url;
    }

    if (Object.keys(updatedData).length === 0) {
      return res.status(400).json({
        message: "No changes detected. At least one field should be updated.",
      });
    }

    await Post.findByIdAndUpdate(postId, updatedData, { new: true });
    res.status(200).json({ message: "Post updated successfully", updatedData });
  } catch (error) {
    next(new HttpError("failed to edit post", 500));
  }
};

// delete post
const deletePost = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const postId = req.params.id;
    const post = await Post.findById(postId);

    if (!post) {
      return next(HttpError("Post not found", 404));
    }

    if (post.creator.toString() !== userId.toString()) {
      return next(
        new HttpError("You are not authorized to delete this post", 403)
      );
    }

    await Post.findByIdAndDelete(postId);
    await User.findByIdAndUpdate(userId, { $inc: { posts: -1 } });

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    next(new HttpError("failed to delete post", 500));
  }
};

module.exports = {
  getPosts,
  createPost,
  getPost,
  getCatPosts,
  getUserPosts,
  editPost,
  deletePost,
};
