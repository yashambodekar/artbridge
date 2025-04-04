import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css"; // Common styling for both navbars

const ConsumerNavbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">ArtBridge</Link>
      </div>
      <ul className="nav-links">
        <li><Link to="/shop">Shop</Link></li>
        <li><Link to="/courses">Courses</Link></li>
        <li><Link to="/cart">Cart</Link></li>
        <li><Link to="/events">Events</Link></li>
        <li><Link to="/profile">Profile</Link></li>
      </ul>
    </nav>
  );
};

export default ConsumerNavbar;
