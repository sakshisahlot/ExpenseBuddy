import React, { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import Button from "./Button";
import { useNavigate } from "react-router-dom"; // Make sure this matches your setup

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State to manage error messages
  const { login, setIsAuthenticated, setUserData } = useAuthContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      // Await login and ensure it returns user data
      const response = await login(email, password);
      if (response) {
        setUserData(response.user);
        setIsAuthenticated(true);
        navigate("/dashboard"); // Redirect to dashboard if successful
      } else {
        throw new Error("Failed to retrieve user data."); // Handle unexpected responses
      }
    } catch (err) {
      // console.error(err);
      setError("Failed to login. Please check your credentials.");
    }
    setLoading(false);
  };

  return (
    <>
      <div className="login-form">
        <div className="innerLayout text-center">
          <h1>Welcome Back</h1>
          <p>
            Don't have an account yet? <a href="/register">Register</a>
          </p>
        </div>
        <form className="form" onSubmit={handleSubmit}>
          {error && <p className="error">{error}</p>}
          <div className="input-control">
            <input
              type="text"
              value={email}
              name={"email"}
              placeholder="email address"
              onChange={(event) => {
                setEmail(event.target.value);
                setError("");
              }}
            />
            <input
              type="password"
              value={password}
              name={"password"}
              placeholder="Password"
              onChange={(event) => {
                setPassword(event.target.value);
                setError("");
              }}
            />

            <div className="submit-btn">
              <Button
                style={{ innerWidth: "50%" }}
                type="submit"
                name={"Login"}
                icon={""}
                bPad={".8rem 43%"}
                bRad={"30px"}
                bg={"var(--color-accent)"}
                color={"#fff"}
                onClick={handleSubmit}
                disabled={loading} // Disable button if loading
              loading={loading} // Pass loading state to the button
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
