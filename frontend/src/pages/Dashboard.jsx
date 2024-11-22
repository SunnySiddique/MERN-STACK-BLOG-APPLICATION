import { Link, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import useGetPosts from "../hooks/useGetPosts";
import DeletePost from "./DeletePost";

const Dashboard = () => {
  const { id } = useParams();
  const { data: posts, isLoading } = useGetPosts(`/api/posts/users/${id}`);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="dashboard">
      {posts.length ? (
        <div className="container dashboard_container">
          {posts.map((post) => (
            <article key={post._id} className="dashboard_post">
              <div className="dashboard_post_info">
                <div className="dashboard_post_thumbnail">
                  <img src={post.thumbnail} alt="" />
                </div>
                <h5>{post.title}</h5>
              </div>
              <div className="dashboard_post_actions">
                <Link to={`/posts/${post._id}`} className="btn sm">
                  View
                </Link>
                <Link to={`/posts/${post._id}/edit`} className="btn sm primary">
                  Edit
                </Link>
                <DeletePost postId={post._id} />
              </div>
            </article>
          ))}
        </div>
      ) : (
        <h2 className="center">You have no posts yet.</h2>
      )}
    </section>
  );
};

export default Dashboard;
