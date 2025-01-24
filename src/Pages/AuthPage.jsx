import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";
import axios from "axios";
import { UserContext } from "../Components/userContext";
import "./style.css";

const AuthPage = () => {
  const { setUserDetail } = useContext(UserContext);
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  // Function to handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const url = `${API_BASE_URL}/api/auth/login`;
      const payload = { email, password };

      const response = await axios.post(url, payload);

      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem("authToken", token);

        setUserDetail(response.data);

        if (response.data.user.role === "admin") {
          navigate("/admin");
        } else if (response.data.user.role === "user") {
          navigate("/user", { state: { user: response.data.user } });
        }
      } else {
        setError(response.data.message || "An error occurred.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!role) {
      setError("Please select a role.");
      return;
    }

    try {
      const url = `${API_BASE_URL}/api/auth/signup`;
      const payload = {
        user: {
          name,
          email,
          password,
          password_confirmation: confirmPassword,
          role,
        },
      };

      const response = await axios.post(url, payload);

      if (response.status === 201) {
        setIsLogin(true);
        setError("");
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setRole("");
      } else {
        setError(response.data.message || "An error occurred during signup.");
      }
    } catch (err) {
      setError("Something went wrong");
    }
  };

  return (
    <>
      <div className="auth-container">
        <h1 className="h1-text">{isLogin ? "Login" : "Sign Up"}</h1>
        <form
          onSubmit={isLogin ? handleLogin : handleSignup}
          className="auth-form"
        >
          {!isLogin && (
            <>
              <TextField
                label="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                fullWidth
                margin="normal"
                placeholder="Enter your full name"
              />
              <FormControl fullWidth margin="normal">
                <Select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    Select Role
                  </MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="user">User</MenuItem>
                </Select>
              </FormControl>
            </>
          )}
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
            margin="normal"
            placeholder="Enter your email"
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
            margin="normal"
            placeholder="Enter your password"
          />
          {!isLogin && (
            <TextField
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              fullWidth
              margin="normal"
              placeholder="Confirm your password"
            />
          )}
          {error && <p className="error-message">{error}</p>}
          <Button
            type="submit"
            variant="contained"
            color="success"
            fullWidth
            style={{ marginTop: "20px" }}
            sx={{
              "&:hover": {
                backgroundColor: "green",
                boxShadow: "none",
              },
            }}
          >
            {isLogin ? "Login" : "Sign Up"}
          </Button>
        </form>
        <div style={{ marginTop: "20px", fontSize: "16px" }}>
          {isLogin ? (
            <>
              Don't have an account?{" "}
              <span
                onClick={() => {
                  setIsLogin(false);
                  setError("");
                  setName("");
                  setEmail("");
                  setPassword("");
                  setConfirmPassword("");
                  setRole("");
                }}
                style={{
                  color: "#45a049",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                Sign up
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                onClick={() => {
                  setIsLogin(true);
                  setError("");
                  setName("");
                  setEmail("");
                  setPassword("");
                  setConfirmPassword("");
                  setRole("");
                }}
                style={{
                  color: "#45a049",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                Login
              </span>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default AuthPage;
