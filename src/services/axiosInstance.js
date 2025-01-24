// src/services/axiosInstance.js
import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL, // Set the base URL from .env
});

// Add a request interceptor to attach the token
instance.interceptors.request.use(
  (config) => {
    // Get the token from localStorage (or wherever it's stored)
    const token = localStorage.getItem("authToken");

    if (token) {
      // Attach the token to the Authorization header for all requests
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

export default instance;
