import axios from "axios";
import { useEffect, useState } from "react";

const useGetPosts = (url) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(url);
      setData(res.data);
    } catch (error) {
      throw new Error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (url) {
      fetchData();
    }
  }, [url]);

  // Return the necessary values from the hook
  return { data, isLoading };
};

export default useGetPosts;
