import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const useLogin = () => {
  const { setAuthUser } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);

  const login = async (userData) => {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/users/login", userData);
      if (data) {
        setAuthUser(data);
      }
      navigate("/");
    } catch (error) {
      throw new Error(error.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return { isLoading, login };
};

export default useLogin;
