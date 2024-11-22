import axios from "axios";
import { useState } from "react";

const useUserProfile = () => {
  const [isLoading, setIsLoading] = useState(false);

  const userProfile = async (userData) => {
    setIsLoading(true);
    try {
      const response = await axios.put("/api/users/edit-user", userData);
      if (response) {
        return response.data.user;
      }
    } catch (error) {
      throw new Error(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, userProfile };
};

export default useUserProfile;
