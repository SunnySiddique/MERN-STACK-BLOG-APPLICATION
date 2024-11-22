import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const useLogout = () => {
  const { setAuthUser } = useAuth();
  const navigate = useNavigate();

  const logoutHandler = async (callback) => {
    try {
      await axios.post("/api/users/logout");
      setAuthUser(null);

      if (callback) {
        callback();
      }
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return { logoutHandler };
};

export default useLogout;
