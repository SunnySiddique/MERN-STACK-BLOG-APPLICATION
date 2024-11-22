import { useState } from "react";
import { toast } from "react-hot-toast"; // Importing the toast notification
import { Link, useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";

const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { isLoading, login } = useLogin();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(userData);

      const isMessageShown = localStorage.getItem("loginMessageShown");
      if (!isMessageShown) {
        localStorage.setItem("loginMessageShown", "true");
        toast.success("Welcome! Your profile is ready for updates.", {
          style: {
            background: "#4caf50",
            color: "#fff",
          },
        });
      }
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  const changeInputHandler = (e) => {
    setUserData((prvState) => {
      return { ...prvState, [e.target.name]: e.target.value };
    });
  };

  return (
    <section className="login">
      <div className="container">
        <h2>Sign In</h2>
        <form className="form login_form" onSubmit={handleLogin}>
          {error && <p className="form_error_message">{error}</p>}
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={userData.email}
            onChange={changeInputHandler}
            autoFocus
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={userData.password}
            onChange={changeInputHandler}
          />
          <button type="submit" className="btn primary">
            {isLoading ? "Loading..." : "Login"}
          </button>
        </form>
        <small>
          {`Don't`} have an account? <Link to="/register">sign up</Link>
        </small>
      </div>
    </section>
  );
};

export default Login;
