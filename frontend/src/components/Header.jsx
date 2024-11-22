import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LogoutButton from "./LogoutButton";
import logo from "/images/logo.webp";

const Header = () => {
  const { authUser } = useAuth();
  const [isNavShowing, setIsNavShowing] = useState(
    window.innerWidth > 800 ? true : false
  );
  const closeNavHandler = () => {
    if (window.innerWidth < 800) {
      setIsNavShowing(false);
    } else {
      setIsNavShowing(true);
    }
  };
  return (
    <nav>
      <div className="container nav_container">
        <Link to="/" className="nav_logo" onClick={closeNavHandler}>
          <img src={logo} alt="Navbar Logo" />
        </Link>
        {authUser && isNavShowing && (
          <ul className="nav_menu">
            <li>
              <Link
                to={`/profile/${authUser?.id || authUser?._id}`}
                onClick={closeNavHandler}
              >
                {authUser?.name}
              </Link>
            </li>
            <li>
              <Link to="/create" onClick={closeNavHandler}>
                Create Post
              </Link>
            </li>
            <li>
              <Link to="/authors" onClick={closeNavHandler}>
                Authors
              </Link>
            </li>
            <li>
              <LogoutButton closeNavHandler={closeNavHandler} />
            </li>
          </ul>
        )}
        {!authUser && isNavShowing && (
          <ul className="nav_menu">
            <li>
              <Link to="/login" onClick={closeNavHandler}>
                Login
              </Link>
            </li>
          </ul>
        )}
        <button
          className="nav_toggle_btn"
          onClick={() => setIsNavShowing(!isNavShowing)}
        >
          {isNavShowing ? <AiOutlineClose /> : <FaBars />}
        </button>
      </div>
    </nav>
  );
};

export default Header;
