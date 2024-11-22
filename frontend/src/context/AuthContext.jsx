import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import Loader from "../components/Loader";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAuthUser = async () => {
      try {
        const res = await axios.get("/api/users/me");
        setAuthUser(res.data);
      } catch (error) {
        setAuthUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAuthUser();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  const value = {
    authUser,
    setAuthUser,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
