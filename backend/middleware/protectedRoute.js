const jwt = require("jsonwebtoken");
const HttpError = require("../models/error.models");
const User = require("../models/user.models");

const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return next(new HttpError("Unauthorized: No Token Provided", 401));
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return next(new HttpError("Unauthorized: Invalid Token", 401));
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return next(new HttpError("User not found", 404));
    }

    req.user = user;

    // Call the next middleware or route handler
    next();
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    return next(new HttpError("Internal Server Error", 500));
  }
};

module.exports = protectedRoute;
