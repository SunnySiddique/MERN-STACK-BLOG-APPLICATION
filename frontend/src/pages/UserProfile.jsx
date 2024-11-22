import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck, FaEdit } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import useUserProfile from "../hooks/useUserProfile";
import defaultProfile from "/images/default-profile-picture1.jpg";

const UserProfile = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    avatar: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const { authUser, setAuthUser } = useAuth();
  const [error, setError] = useState("");
  const [avatarUploaded, setAvatarUploaded] = useState(false);
  const { isLoading, userProfile } = useUserProfile();
  const avatarRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setAvatarUploaded(false);
  }, []);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUserData({ ...userData, avatar: reader.result });
        setAvatarUploaded(true);
        setTimeout(() => {
          setAvatarUploaded(false);
        }, 2000);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleUserProfile = async (e) => {
    e.preventDefault();
    try {
      setError("");
      const updatedData = { ...userData };

      if (!avatarUploaded) {
        delete updatedData.avatar;
      }

      // Update the user profile via API or other method
      const updatedUser = await userProfile(updatedData);

      setUserData({
        ...updatedUser,
      });
      setAuthUser(updatedUser);
      navigate("/");
      toast.success("Profile Updated Successfully!", {
        style: { background: "#4caf50", color: "#fff" },
      });
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    setUserData({
      name: authUser.name || "",
      email: authUser.email || "",
      avatar: authUser.avatar || "",
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });
  }, [authUser]);

  return (
    <section className="profile">
      <div className="container profile_container">
        <Link to={`/myposts/${authUser._id}`} className="btn">
          My posts {""}
          <small>{authUser.posts}</small>
        </Link>
        <div className="profile_details">
          <div className="avatar_wrapper">
            <div className="profile_avatar">
              <img
                src={userData.avatar || defaultProfile}
                alt="Profile Avatar"
              />
            </div>
            <form className="avatar_form">
              <input
                type="file"
                name="avatar"
                id="avatar"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleAvatarChange}
                ref={avatarRef}
              />
              <label htmlFor="avatar">
                {!avatarUploaded ? <FaEdit /> : <FaCheck />}
              </label>
            </form>
            {!avatarUploaded && (
              <button
                className="profile_avatar_btn"
                onClick={() => avatarRef.current.click()}
              >
                <FaEdit />
              </button>
            )}
          </div>

          <h1>{userData.name || "John Doe"}</h1>
          <form className="form profile_form" onSubmit={handleUserProfile}>
            {error && <p className="form_error_message">{error}</p>}

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={userData.name || ""}
              onChange={handleChange}
            />
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={userData.email || ""}
              onChange={handleChange}
            />
            <input
              type="password"
              name="currentPassword"
              placeholder="Current Password"
              value={userData.currentPassword || ""}
              onChange={handleChange}
            />
            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              value={userData.newPassword || ""}
              onChange={handleChange}
            />
            <input
              type="password"
              name="confirmNewPassword"
              placeholder="Confirm Password"
              value={userData.confirmNewPassword || ""}
              onChange={handleChange}
            />
            <button type="submit" className="btn primary" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update details"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
