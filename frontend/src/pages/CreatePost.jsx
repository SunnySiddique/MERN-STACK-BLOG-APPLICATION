import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import useCreatePost from "../hooks/useCreatePost";

const CreatePost = () => {
  const { setAuthUser } = useAuth();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Uncategorized");
  const [description, setDescription] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState("");
  const { createPost, isLoading, error, setError } = useCreatePost();

  const POST_CATEGORIES = [
    "Agriculture",
    "Business",
    "Education",
    "Entertainment",
    "Art",
    "Investment",
    "Uncategorized",
    "Weather",
    "Lifestyle",
    "Health & Wellness",
    "Personal Development",
    "Travel",
    "Home & Decor",
  ];

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailFile(reader.result); // This will be a base64 string
      };
      reader.readAsDataURL(file); // This converts the image file to base64
    }
  };

  const handlePost = async (e) => {
    e.preventDefault();
    const success = await createPost({
      title,
      category,
      description,
      thumbnailFile,
    });

    if (success) {
      setAuthUser((prevState) => ({
        ...prevState,
        posts: prevState.posts + 1,
      }));
      toast.success(
        "Blog Created Successfully! Your post has been published.",
        {
          style: {
            background: "#4caf50",
            color: "#fff",
          },
        }
      );
    }

    setTimeout(() => {
      setError("");
    }, 2000);
  };

  return (
    <section className="create_post">
      <div className="container">
        <h2>Create Post</h2>
        {error && <p className="form_error_message">{error}</p>}
        <form className="form create_post_form" onSubmit={handlePost}>
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

          <input type="file" placeholder="Image" onChange={handleFileUpload} />

          <button type="submit" className="btn primary">
            {isLoading ? "Loading..." : "Create"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreatePost;
