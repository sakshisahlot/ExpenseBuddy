import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // Import the AuthContext to access the register function
import Button from "./Button";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(""); // State to store any errors during registration
  const { register } = useContext(AuthContext); // Access the register function from AuthContext
  const navigate = useNavigate(); // Initialize useNavigate for redirection
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault(); // Prevent default form submission behavior

    if (password !== confirmPassword) {
      setError("Passwords do not match"); // Set error message if passwords don't match
      setLoading(false);
      return;
    }

    try {
      await register(username, email, password); // Call the register function from AuthContext
      setError(""); // Clear any existing error messages
      navigate("/login"); // Redirect to the dashboard or home page after successful registration
    } catch (err) {
      console.error(err.message); // Log any errors to the console
      setError(err.message); // Set error message on registration failure
    }
    setLoading(false);
  };

  return (
    <div className="register-form">
      <div className="innerLayout text-center">
        <h1>Create your account</h1>
        <p>
          Have an account yet? <a href="/">Login</a>
        </p>
      </div>
      <form className="form" onSubmit={handleSubmit}>
        {error && <p className="error">{error}</p>}
        <div className="input-control">
          <input
            type="text"
            value={username}
            name="username"
            placeholder="Name"
            onChange={(event) => {
              setUsername(event.target.value);
              setError("");
            }}
            required
          />
          <input
            type="text"
            value={email}
            name="email"
            placeholder="Email address"
            onChange={(event) => {
              setEmail(event.target.value);
              setError("");
            }}
            required
          />
          <input
            type="password"
            value={password}
            name="password"
            placeholder="Password"
            onChange={(event) => {
              setPassword(event.target.value);
              setError("");
            }}
            required
          />
          <input
            type="password"
            value={confirmPassword}
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={(event) => {
              setConfirmPassword(event.target.value);
              setError("");
            }}
            required
          />
          <div className="submit-btn">
            <Button
              type="submit"
              name="Register"
              style={{ width: "50%" }}
              bPad=".8rem 43%"
              bRad="30px"
              bg="var(--color-accent)"
              color="#fff"
              onClick={handleSubmit}
              disabled={loading} // Disable button if loading
              loading={loading} // Pass loading state to the button
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
