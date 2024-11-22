import axios from "axios";
import { useState } from "react";

const useDeletePost = () => {
  const [isLoading, setIsLoading] = useState(false);

  const deletePost = async (postId) => {
    setIsLoading(true);
    try {
      const res = await axios.delete(`/api/posts/${postId}`);

      return res.data;
    } catch (error) {
      throw new Error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { deletePost, isLoading };
};

export default useDeletePost;
