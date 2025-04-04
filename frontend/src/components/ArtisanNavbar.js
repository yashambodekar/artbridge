import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css"; // Common styling for both navbars

const ArtisanNavbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">ArtBridge</Link>
      </div>
      <ul className="nav-links">
        <li><Link to="/sell">Sell</Link></li>
        <li><Link to="/courses">Courses</Link></li>
        <li><Link to="/profile">Profile</Link></li>
      </ul>
    </nav>
  );
};

export default ArtisanNavbar;
