// AuthContext.js

import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const API_BASE_URL =  process.env.REACT_APP_API_BASE_URL;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("auth");
    const fetchData = async () => {
      try {
        const data = await getUserData();
        setUserData(data);
        setIsAuthenticated(data !== null);
      } catch (err) {
        // console.error("Error fetching user data:", err);
        setError("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const register = async (username, email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}register`, {
        username,
        email,
        password,
      });
      setUserData(response.data);
      setIsAuthenticated(true);
      localStorage.setItem("auth-id", response.data._id);
      return response.data; // Return response data for use in the component
    } catch (err) {
      if (err.response && err.response.status === 400) {
        // Assuming 409 Conflict for duplicate email
        throw new Error("Email already registered"); // Custom error for duplicate email
      } else if (err.response && err.response.status === 500) {
        throw new Error("Username already exists");
      }
      // console.error("Error registering user:", err);
      throw new Error("Registration failed"); // General error message
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}login`, {
        email,
        password,
      });
      setUserData(response.data);
      setIsAuthenticated(true);
      localStorage.setItem("auth-id", response.data._id);
      return response.data; // Return response data for use in the component
    } catch (err) {
      // console.error("Login error:", err);
      throw err; // Rethrow to be caught by the calling function
    }
  };

  const getUserData = async () => {
    const userId = localStorage.getItem("auth-id");
    if (!userId) {
      setLoading(false);
      return null; // Return null if no userId is found
    }
    try {
      const response = await axios.get(`${API_BASE_URL}getUserData/${userId}`);
      return response.data;
    } catch (err) {
      // console.error("Error getting user data:", err);
      setError("Failed to get user data");
      return null; // Return null on error
    }
  };

  const logout = () => {
    localStorage.removeItem("auth-id");
    setUserData(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        loading,
        login,
        register,
        logout,
        getUserData,
        userData,
        setUserData,
        isAuthenticated,
        setIsAuthenticated,
        error,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
