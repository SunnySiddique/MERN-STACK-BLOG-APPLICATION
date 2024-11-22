const express = require("express");
const {
  singUpUser,
  loginUser,
  getUser,
  getAuthors,
  editUser,
  logout,
  getUserById,
} = require("../controllers/user.controllers");
const protectedRoute = require("../middleware/protectedRoute");
const router = express.Router();

router.get("/me", protectedRoute, getUser);
router.get("/:id", getUserById);
router.get("/", protectedRoute, getAuthors);
router.post("/signup", singUpUser);
router.post("/login", loginUser);
router.post("/logout", logout);
router.put("/edit-user", protectedRoute, editUser);

module.exports = router;
