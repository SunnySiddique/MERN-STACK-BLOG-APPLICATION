import { Link, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import PostAuthor from "../components/PostAuthor";
import { useAuth } from "../context/AuthContext";
import useGetPosts from "../hooks/useGetPosts";
import DeletePost from "./DeletePost";

const PostDetail = () => {
  const { authUser } = useAuth();
  const { id } = useParams();
  const { data: details, isLoading } = useGetPosts(`/api/posts/${id}`);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <section className="post_detail">
      <div className="container post_detail_con">
        <div className="post_detail_header">
          <PostAuthor
            authorID={details?.creator}
            createdAt={details?.createdAt}
          />
          {authUser?._id === details.creator && (
            <div className="post_detail_buttons">
              <Link
                to={`/posts/${details._id}/edit`}
                className="btn sm primary"
              >
                Edit
              </Link>

              <DeletePost postId={id} />
            </div>
          )}
        </div>
        <h1>{details.title}</h1>
        <div className="post_detail_thumbnail">
          <img src={details.thumbnail} alt="" />
        </div>
        <p>{details.description}</p>
      </div>
    </section>
  );
};

export default PostDetail;
