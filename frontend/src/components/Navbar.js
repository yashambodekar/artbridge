import React from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="nav-tabs">
          <button className="nav-tab" onClick={() => navigate("/")}>
            Home
          </button>
          <button className="nav-tab" onClick={() => navigate("/our-artisans")}>
            Meet Our Artisans
          </button>
          <button className="nav-tab" onClick={() => navigate("/events")}>
            Art Events
          </button>
        </div>
      </div>
      <div className="navbar-right">
        <button className="sign-in-button" onClick={() => navigate("/login")}>
          <span className="sign-in-text">Sign In</span>
          <span className="sign-in-icon">→</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;