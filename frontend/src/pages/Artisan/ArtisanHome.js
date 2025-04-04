import React from "react";
import { Link } from "react-router-dom";
import ArtisanNavbar from "../../components/ArtisanNavbar";
import "./../../styles/ArtisanHome.css"; // Ensure this CSS file exists

const ArtisanHome = () => {
  // Placeholder for dynamic stats (can be replaced with API data later)
  const stats = {
    productsSold: 120,
    coursesCreated: 5,
  };

  return (
    <div className="artisan-home-container">
      <ArtisanNavbar />

      <div className="artisan-content">
        <h1>Welcome, Artisan!</h1>
        <p>Manage your products, courses, and sales all in one place.</p>

        {/* Artisan Statistics Section */}
        <div className="artisan-stats">
          <div className="stat-card">
            <h3>Products Sold</h3>
            <p>{stats.productsSold}</p>
          </div>
          <div className="stat-card">
            <h3>Courses Created</h3>
            <p>{stats.coursesCreated}</p>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="artisan-links">
          <Link to="/sell" className="artisan-btn">Manage Products</Link>
          <Link to="/add-courses" className="artisan-btn">Add Courses</Link>
          <Link to="/orders" className="artisan-btn">View Orders</Link>
        </div>
      </div>
    </div>
  );
};

export default ArtisanHome;
