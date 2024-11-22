import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import useRegister from "../hooks/useRegister";

const Register = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const { isLoading, register } = useRegister();

  const changeInputHandler = (e) => {
    setUserData((prvState) => {
      return { ...prvState, [e.target.name]: e.target.value };
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const success = await register(userData);
      if (success) {
        toast.success("Signup successful! Please log in to continue.", {
          style: {
            background: "#4caf50",
            color: "#fff",
          },
        });
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section className="register">
      <div className="container">
        <h2>Sign Up</h2>
        <form className="form register_form" onSubmit={handleRegister}>
          {error && <p className="form_error_message">{error}</p>}
          <input
            type="text"
            placeholder="Full Name"
            name="name"
            value={userData.name}
            onChange={changeInputHandler}
          />
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={userData.email}
            onChange={changeInputHandler}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={userData.password}
            onChange={changeInputHandler}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={userData.confirmPassword}
            onChange={changeInputHandler}
          />
          <button type="submit" className="btn primary">
            {isLoading ? "Loading..." : "Register"}
          </button>
        </form>
        <small>
          Already have an account? <Link to="/login">sign in</Link>
        </small>
      </div>
    </section>
  );
};

export default Register;
