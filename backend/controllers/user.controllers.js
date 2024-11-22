const { default: mongoose } = require("mongoose");
const generateTokenAndSetCookie = require("../lib/utils/generateTokenAndSetCookie");
const HttpError = require("../models/error.models");
const User = require("../models/user.models");

const bcrypt = require("bcryptjs");
const cloudinary = require("cloudinary").v2;

const singUpUser = async (req, res, next) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password) {
      return next(new HttpError("Fill in all fields", 422));
    }

    const newEmail = email.toLowerCase();

    const emailExists = await User.findOne({ email: newEmail });

    if (emailExists) {
      return next(new HttpError("Email already exits.", 422));
    }

    if (password.trim().length < 6) {
      return next(
        new HttpError("Password should be at least 6 characters.", 422)
      );
    }

    if (password !== confirmPassword) {
      return next(new HttpError("Passwords do not match", 422));
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email: newEmail,
      password: hashedPassword,
    });
    await newUser.save();
    generateTokenAndSetCookie(newUser._id, res);
    res.status(201).json(newUser);
  } catch (error) {
    next(new HttpError("User registration failed", 500));
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new HttpError("Fill in all fields", 422));
    }

    const newEmail = email.toLowerCase();

    const user = await User.findOne({ email: newEmail });
    if (!user) {
      return next(new HttpError("User not found, please sign up", 404));
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return next(new HttpError("Invalid credentials, please try again", 401));
    }

    generateTokenAndSetCookie(user._id, res);
    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    return next(
      new HttpError("Login failed, Please check your credentials", 500)
    );
  }
};

const getUserById = async (req, res, next) => {
  const { id } = req.params;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new HttpError("Invalid user ID", 400));
  }

  try {
    const user = await User.findById(id).select("-password");
    if (!user) {
      return next(new HttpError("User not found", 404));
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user by ID", error);
    next(new HttpError("Something went wrong", 500));
  }
};

const getUser = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return next(new HttpError("User not found.", 404));
    }

    res.status(200).json(user);
  } catch (error) {
    next(new HttpError(error));
  }
};

const getAuthors = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const authors = await User.find({ _id: { $ne: userId } }).select(
      "-password"
    );

    res.json(authors);
  } catch (error) {
    next(new HttpError(error));
  }
};

const editUser = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { name, email, currentPassword, newPassword, confirmNewPassword } =
      req.body;
    let { avatar } = req.body;

    const user = await User.findById(userId);
    if (!user) return next(new HttpError("User not found!", 404));

    // Handle avatar update if provided
    if (avatar) {
      if (user.avatar) {
        await cloudinary.uploader.destroy(
          user.avatar.split("/").pop().split(".")[0]
        );
      }
      const uploadedRes = await cloudinary.uploader.upload(avatar);
      avatar = uploadedRes.secure_url;
      user.avatar = avatar; // Ensure the user object has the updated avatar
    }

    // Handle other profile updates
    if (name) user.name = name;

    // Email validation before update
    if (email) {
      const emailExist = await User.findOne({ email });
      if (emailExist && emailExist._id.toString() !== userId.toString()) {
        return next(new HttpError("Email already exists.", 422));
      }
      user.email = email;
    }

    // Password change logic
    if (currentPassword && newPassword && confirmNewPassword) {
      const validateUserPassword = await bcrypt.compare(
        currentPassword,
        user.password
      );
      if (!validateUserPassword) {
        return next(new HttpError("Invalid current password", 422));
      }
      if (newPassword !== confirmNewPassword) {
        return next(new HttpError("New passwords do not match", 422));
      }
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
    }

    await user.save();

    // Return updated user data, including avatar
    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar, // Ensure the avatar is included in the response
      },
    });
  } catch (error) {
    console.error("Error in editUser", error);
    next(new HttpError("Something went wrong while updating profile", 500));
  }
};

const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(400).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  singUpUser,
  loginUser,
  getUser,
  getAuthors,
  editUser,
  logout,
  getUserById,
};
