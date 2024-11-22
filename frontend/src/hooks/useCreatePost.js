import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useCreatePost = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const createPost = async ({
    title,
    category,
    description,
    thumbnailFile,
  }) => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        "/api/posts/create",
        { title, category, description, thumbnail: thumbnailFile }, // Send the base64 string here
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      navigate("/"); // Redirect to home page or wherever needed
      return res.data;
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, createPost, error, setError };
};

export default useCreatePost;
