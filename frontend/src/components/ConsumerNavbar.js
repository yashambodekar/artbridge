// components/ConsumerNavbar.js
import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const ConsumerNavbar = ({ onProfileClick }) => {
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">ArtBridge</Link>
      </div>
      <ul className="nav-links">
        <li><Link to="/Consumer/ConsumerHome">Home</Link></li>
        <li><Link to="/Consumer/Shop">Shop</Link></li>
        <li><Link to="/Consumer/ConsumerCourses">Courses</Link></li>
        <li><Link to="/Consumer/Cart">Cart</Link></li>
         <li>
                  <Link to="#" onClick={onProfileClick}>Profile</Link>
                </li>
        {/* <li><button onClick={onProfileClick} className="profile-btn">Profile</button></li> */}
      </ul>
    </nav>
  );
};

export default ConsumerNavbar;
