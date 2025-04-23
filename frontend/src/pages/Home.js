import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/Home.css";

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [logoAnimated, setLogoAnimated] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
    
    // If no user is logged in, redirect to login page
    if (!storedUser) {
      navigate("/login");
    }

    // Trigger logo animation after a short delay
    setTimeout(() => {
      setLogoAnimated(true);
    }, 500);
  }, [navigate]);

  return (
    <div className="home-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-left">
          <div className="nav-tabs">
            <button className="nav-tab active" onClick={() => navigate("/")}>Home</button>
            <button className="nav-tab" onClick={() => navigate("/our-artisans")}>Meet Our Artisans</button>
            <button className="nav-tab" onClick={() => navigate("/events")}>Art Events</button>
          </div>
        </div>
        <div className="navbar-right">
          <button className="sign-in-button" onClick={() => navigate("/login")}>
            <span className="sign-in-text">Sign In</span>
            <span className="sign-in-icon">→</span>
          </button>
        </div>
      </nav>

      {/* Hero Section with Logo */}
      <div className="hero-section">
        <div className={`logo-container ${logoAnimated ? 'animated' : ''}`}>
          <h1 className="hero-title">
            <span className="gradient-text">Artbridge</span>
          </h1>
          <p className="hero-tagline">connecting Artisans with the World</p>
        </div>
      </div>

      {/* Registration Cards */}
      <div className="registration-cards">
        <div 
          className="reg-card consumer-card"
          onClick={() => navigate("/ConsumerSignup")}
        >
          <div className="card-content">
            <h2 className="card-title">Be A Consumer</h2>
            <p className="card-description">
              Learn art from courses, Buy Art Products, and explore the creative world.
            </p>
            <button className="card-button">Register Now</button>
          </div>
        </div>

        <div 
          className="reg-card artisan-card"
          onClick={() => navigate("/ArtisanSignup")}
        >
          <div className="card-content">
            <h2 className="card-title">Be an Artisan</h2>
            <p className="card-description">
              Showcase your art to the world and connect with passionate consumers.
            </p>
            <button className="card-button">Register Now</button>
          </div>
        </div>
      </div>

      {/* Footer
      <footer className="footer">
        <p>&copy; 2025 Artisan's Connect. All rights reserved.</p>
      </footer> */}
    </div>
  );
};

export default Home;