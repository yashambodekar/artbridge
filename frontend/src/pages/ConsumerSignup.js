import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./../styles/Auth.css";
import ArtbridgeImage from './../assets/ArtBridge.jpeg';


const ConsumerSignup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await axios.post("https://artisans-bridge.onrender.com/api/auth/register", {
        role: "Consumer",
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
      <div className="auth-form-box">
        <div className="auth-illustration">
        <img src={ArtbridgeImage} alt="Artbridge" />
        </div>
        <div className="auth-form-content">
          <h2 className="auth-title">Join as a Consumer</h2>
          <p className="auth-subtitle">Discover unique artworks and learn from artists</p>
          
          <form onSubmit={handleSignup} className="auth-form">
            <div className="form-group">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Contact"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="auth-button">Create Consumer Account</button>
          </form>
          
          <p className="auth-redirect">
            Already have an account?{" "}
            <span onClick={() => navigate("/login")}>Login</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConsumerSignup;
