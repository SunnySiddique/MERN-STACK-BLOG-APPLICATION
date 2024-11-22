import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import PostItem from "../components/PostItem";
import useGetPosts from "../hooks/useGetPosts";

const CategoryPosts = () => {
  const { category } = useParams();
  const { data: posts, isLoading } = useGetPosts(
    `/api/posts/category/${category}`
  );
  if (isLoading) {
    return <Loader />;
  }
  return (
    <section>
      {posts.length > 0 ? (
        <div className="container posts_container">
          {posts.map(
            ({
              _id: id,
              thumbnail,
              category,
              title,
              description: des,
              creator: authorID,
              createdAt,
            }) => (
              <PostItem
                key={id}
                postID={id}
                thumbnail={thumbnail}
                category={category}
                title={title}
                des={des}
                authorID={authorID}
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

export default CategoryPosts;
