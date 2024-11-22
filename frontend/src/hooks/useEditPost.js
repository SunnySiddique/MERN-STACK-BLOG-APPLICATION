import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const useEditPost = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const editPost = async ({ title, category, description, thumbnail }) => {
    setIsLoading(true);

    try {
      // Update the post with the new data
      const res = await axios.put(
        `/api/posts/${id}`,
        { title, category, description, thumbnail },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      navigate("/");
      return res.data;
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, editPost, error }; // Return the editPost function and other states
};

export default useEditPost;
