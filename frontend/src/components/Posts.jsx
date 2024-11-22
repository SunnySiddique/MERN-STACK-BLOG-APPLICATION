import useGetPosts from "../hooks/useGetPosts";
import Loader from "./Loader";
import PostItem from "./PostItem";

const Posts = () => {
  const { data: posts, isLoading } = useGetPosts("/api/posts");
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
              description: des,
              createdAt,
              creator,
            }) => (
              <PostItem
                key={id}
                postID={id}
                thumbnail={thumbnail}
                category={category}
                title={title}
                des={des}
                authorID={creator}
                createdAt={createdAt}
              />
            )
          )}
        </div>
      ) : (
        <h2 className="center">No posts founds</h2>
      )}
    </section>
  );
};

export default Posts;
