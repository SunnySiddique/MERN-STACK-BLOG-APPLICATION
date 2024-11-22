import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import PostItem from "../components/PostItem";
import useGetPosts from "../hooks/useGetPosts";

const AuthorPosts = () => {
  const { id } = useParams();
  const { data: posts, isLoading } = useGetPosts(`/api/posts/users/${id}`);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <section className="posts">
      {posts?.length > 0 ? (
        <div className="container posts_container">
          {posts?.map(
            ({
              _id: id,
              thumbnail,
              category,
              title,
              description,
              creator: authorID,
              createdAt,
            }) => (
              <PostItem
                key={id}
                postID={id}
                thumbnail={thumbnail}
                category={category}
                title={title}
                des={description}
                createdAt={createdAt}
                authorID={authorID}
              />
            )
          )}
        </div>
      ) : (
        <h2 className="center">This author has not published any blogs yet</h2>
      )}
    </section>
  );
};

export default AuthorPosts;
