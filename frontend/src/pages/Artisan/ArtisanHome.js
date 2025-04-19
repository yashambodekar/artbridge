import React from "react";
import { Link } from "react-router-dom";
import "./../../styles/ArtisanHome.css";

const ArtisanHome = () => {
  const stats = {
    productsSold: 120,
    coursesCreated: 5,
  };

  return (
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
        <Link to="/Artisan/Sell" className="artisan-btn">Manage Products</Link>
        <Link to="/Artisan/AddCourse" className="artisan-btn">Add Courses</Link>
        <Link to="/orders" className="artisan-btn">View Orders</Link>
      </div>
    </div>
  );
};

export default ArtisanHome;
