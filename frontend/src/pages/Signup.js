import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Auth.css"; // Shared CSS for Login & Signup

const Signup = () => {
  const [role, setRole] = useState("Artisan"); // Renamed userType to role
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) return alert("Passwords do not match");

    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        role, // Changed userType to role
        name,
        email,
        contact,
        address,
        password,
      });
      alert("Signup Successful");
      navigate("/login");
    } catch (error) {
      alert("Signup Failed");
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              value="Artisan"
              checked={role === "Artisan"}
              onChange={() => setRole("Artisan")} // Changed setUserType to setRole
            />
            Artisan
          </label>
          <label>
            <input
              type="radio"
              value="Consumer"
              checked={role === "Consumer"}
              onChange={() => setRole("Consumer")} // Changed setUserType to setRole
            />
            Consumer
          </label>
        </div>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Contact"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account?{" "}
        <span onClick={() => navigate("/login")}>Login</span>
      </p>
    </div>
  );
};

export default Signup;