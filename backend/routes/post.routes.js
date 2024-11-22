const express = require("express");
const {
  getPosts,
  createPost,
  getPost,
  getCatPosts,
  getUserPosts,
  editPost,
  deletePost,
} = require("../controllers/post.controllers");
const protectedRoute = require("../middleware/protectedRoute");

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPost);
router.get("/category/:category", getCatPosts);
router.get("/users/:id", getUserPosts);
router.post("/create", protectedRoute, createPost);
router.put("/:id", protectedRoute, editPost);
router.delete("/:id", protectedRoute, deletePost);

module.exports = router;
