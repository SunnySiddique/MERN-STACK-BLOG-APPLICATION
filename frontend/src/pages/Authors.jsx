import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import useGetPosts from "../hooks/useGetPosts";
import defaultProfile from "/images/default-profile-picture1.jpg";

const Authors = () => {
  const { data: authorsData, isLoading } = useGetPosts("/api/users");
  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="authors">
      {authorsData?.length > 0 ? (
        <div className="container authors_container">
          {authorsData?.map(({ _id: id, avatar, name, posts }) => {
            return (
              <Link to={`/posts/users/${id}`} key={id} className="author">
                <div className="author_avatar">
                  <img
                    style={{ height: "100%" }}
                    src={avatar || defaultProfile}
                  />
                </div>
                <div className="author_info">
                  <h4>{name}</h4>
                  <p>{posts}</p>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <h2 className="center">No users/Authors Found!</h2>
      )}
    </section>
  );
};

export default Authors;
