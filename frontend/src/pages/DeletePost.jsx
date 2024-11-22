import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { useAuth } from "../context/AuthContext";
import useDeletePost from "../hooks/useDeletePost";

const DeletePost = ({ postId }) => {
  const { setAuthUser } = useAuth();
  const { deletePost, isLoading } = useDeletePost();
  const navigate = useNavigate();

  const handleDelete = async () => {
    const isDeleted = await deletePost(postId);
    if (isDeleted) {
      navigate("/");
      setAuthUser((prevState) => ({
        ...prevState,
        posts: prevState.posts - 1,
      }));
      toast.success("Blog Deleted Successfully.", {
        style: {
          background: "#f44336", // Red for delete action
          color: "#fff",
        },
      });
    }
  };

  if (isLoading) return <Loader />;

  return (
    <>
      <button className="btn sm danger" onClick={handleDelete}>
        {isLoading ? "Loading..." : "Delete"}
      </button>
    </>
  );
};

export default DeletePost;
