import moment from "moment";
import { Link } from "react-router-dom";
import useGetPosts from "../hooks/useGetPosts";
import defaultProfile from "/images/default-profile-picture1.jpg";

const PostAuthor = ({ createdAt, authorID }) => {
  const { data: authorData } = useGetPosts(`/api/users/${authorID}`);
  const timeAgo = moment(createdAt).fromNow();

  return (
    <Link to={`/posts/users/${authorID}`} className="post_author">
      <div className="post_author_avatar">
        <img src={authorData?.avatar || defaultProfile} alt="Avatar" />
      </div>

      <div className="post_author_details">
        {/* Displaying author's name and time */}
        <h5>{authorData?.name}</h5>
        <small>{timeAgo}</small>
      </div>
    </Link>
  );
};

export default PostAuthor;
