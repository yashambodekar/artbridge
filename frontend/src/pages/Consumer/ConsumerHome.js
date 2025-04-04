import React from "react";
import { useNavigate } from "react-router-dom";
import ConsumerNavbar from "../../components/ConsumerNavbar";
 // Import Consumer Navbar
import "./../../styles/ConsumerHome.css"; // Ensure this CSS file exists

const ConsumerHome = () => {
  const navigate = useNavigate();

  return (
    <div className="consumer-home">
      {/* Navbar for Consumers */}
      <ConsumerNavbar />

      <header className="consumer-header">
        <h1>Welcome to ArtBridge</h1>
        <p>Discover unique handmade products and enriching courses from skilled artisans.</p>
      </header>

      {/* Consumer Sections */}
      <div className="consumer-sections">
        <div className="consumer-card" onClick={() => navigate("/shop")}>
          <h2>Shop</h2>
          <p>Explore a wide variety of handmade products crafted by artisans.</p>
        </div>

        <div className="consumer-card" onClick={() => navigate("/consumer-courses")}>
          <h2>Courses</h2>
          <p>Learn new skills by enrolling in artisan-led courses.</p>
        </div>

        <div className="consumer-card" onClick={() => navigate("/cart")}>
          <h2>Cart</h2>
          <p>View and manage the products you want to buy.</p>
        </div>

        <div className="consumer-card" onClick={() => navigate("/events")}>
          <h2>Events</h2>
          <p>Stay updated on upcoming artisan workshops and exhibitions.</p>
        </div>
      </div>
    </div>
  );
};

export default ConsumerHome;
