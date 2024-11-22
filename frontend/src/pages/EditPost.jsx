import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import useEditPost from "../hooks/useEditPost"; // Ensure this import is correct
import useGetPosts from "../hooks/useGetPosts";

const EditPost = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Uncategorized");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const { editPost, isLoading, error } = useEditPost(); // Use useEditPost correctly
  const { data: details } = useGetPosts(`/api/posts/${id}`);

  const POST_CATEGORIES = [
    "Agriculture",
    "Business",
    "Education",
    "Entertainment",
    "Art",
    "Investment",
    "Uncategorized",
    "Weather",
  ];

  const handleForm = async (e) => {
    e.preventDefault();
    const success = await editPost({ title, category, description, thumbnail });
    if (success)
      toast.success("Blog Edited Successfully! Your changes have been saved.", {
        style: {
          background: "#4caf50", // Green for success
          color: "#fff",
        },
      });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnail(reader.result); // This will be a base64 string
      };
      reader.readAsDataURL(file); // This converts the image file to base64
    }
  };

  useEffect(() => {
    if (details) {
      setTitle(details.title || "");
      setCategory(details.category || "");
      setDescription(details.description || "");
      setThumbnail(details.thumbnail || "");
    }
  }, [details]);

  return (
    <section className="create_post">
      <div className="container">
        <h2>Edit Post</h2>
        {error && <p className="form_error_message">{error}</p>}
        <form className="form create_post_form" onSubmit={handleForm}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
          <select
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {POST_CATEGORIES.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>

          <textarea
            placeholder="Description"
            cols={25}
            rows={10}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <input
            type="file"
            placeholder="Image"
            onChange={handleFileUpload}
            accept="image/*"
          />

          <button type="submit" className="btn primary">
            {isLoading ? "Updating..." : "Update"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditPost;
