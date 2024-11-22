import { Link } from "react-router-dom";
import PostAuthor from "./PostAuthor";

const PostItem = ({
  postID,
  category,
  title,
  des,
  authorID,
  thumbnail,
  createdAt,
}) => {
  const shortDescription = des.length > 145 ? des.substr(0, 145) + "..." : des;
  const postTitle = des.length > 30 ? title.substr(0, 30) + "..." : title;
  return (
    <article className="post">
      <div className="post_thumbnail">
        <img src={thumbnail} alt={title} />
      </div>
      <div className="post_content">
        <Link to={`/posts/${postID}`}>
          <h3>{postTitle}</h3>
        </Link>
        <p>{shortDescription}</p>
        <div className="post_footer">
          <PostAuthor authorID={authorID} createdAt={createdAt} />
          <Link to={`/posts/categories/${category}`} className="btn category">
            {category}
          </Link>
        </div>
      </div>
    </article>
  );
};

export default PostItem;
