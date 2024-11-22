const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const { v2: cloudinary } = require("cloudinary");
const dotenv = require("dotenv");
const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const connectionDB = require("./config/db");
const app = express();
const __dirnames = path.resolve();

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// port
const PORT = process.env.PORT || 5000;

// middlewares
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

// Serve static files
app.use(express.static(path.join(__dirnames, "/frontend/dist")));

// Handle all other routes for frontend
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirnames, "frontend", "dist", "index.html"));
});

// Error-handling middleware
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App is running at http://localhost:${PORT}`);

  connectionDB();
});
