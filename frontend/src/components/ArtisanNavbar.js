import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const ArtisanNavbar = ({ onProfileClick }) => {
  const handleProfileClick = (e) => {
    e.preventDefault(); // Prevent navigation
    onProfileClick();   // Open the sidebar
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">ArtBridge</Link>
      </div>
      <ul className="nav-links">
        <li><Link to="/Artisan/ArtisanHome">Home</Link></li>
        <li><Link to="/Artisan/Sell">Products</Link></li>
        <li><Link to="/Artisan/Courses">Courses</Link></li>
        <li>
          <Link to="#" onClick={handleProfileClick}>Profile</Link>
        </li>
      </ul>
    </nav>
  );
};

export default ArtisanNavbar;
