import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useRegister = () => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);

  const register = async (userData) => {
    setLoading(true);
    try {
      await axios.post("/api/users/signup", userData);
      navigate("/");
    } catch (error) {
      throw new Error(error.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return { isLoading, register };
};

export default useRegister;
