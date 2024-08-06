import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

const Logout = () => {
  const { logout } = useContext(AuthContext); // Access the logout function from AuthContext
  const navigate = useNavigate(); // Initialize useNavigate for redirection

  useEffect(() => {
    const performLogout = async () => {
      await logout(); // Call the logout function
      navigate("/"); // Redirect to the home page or login page after logout
    };

    performLogout();
  }, [logout, navigate]);

  return (
    <div className="signout-page">
      <h1>Signing out...</h1>
      <p>You are being logged out. Please wait...</p>
    </div>
  );
};

export default Logout;
