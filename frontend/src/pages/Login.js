import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Auth.css"; // Shared CSS for Login & Signup

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      console.log("Login Response:", response.data); // Debugging log
      console.log("User Object:", response.data.user); // Debugging log
      alert("Login Successful");
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", response.data.token);

      const role = response.data.user?.role || "unknown"; // Use optional chaining to avoid errors if user is undefined
      console.log("User Role:", role); // Debugging log
      if (role === "Artisan") {
        navigate("/Artisan/ArtisanHome");
      } else if (role === "Consumer") {
        navigate("/Consumer/ConsumerHome");
      } else {
        alert("Unknown role. Please contact support.");
      }
    } catch (error) {
      console.error("Login Error:", error); // Debugging log
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        alert("Login Failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <p>
        Don't have an account?{" "}
        <span onClick={() => navigate("/Signup")}>Sign up</span>
      </p>
    </div>
  );
};

export default Login;