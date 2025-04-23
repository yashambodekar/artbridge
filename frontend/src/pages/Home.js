import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./../components/Navbar"; // Import the Navbar component
import "./../styles/Home.css";
import ArtisanImage from "./../assets/Artisan.webp"; // Import Artisan background image
import ConsumerImage from "./../assets/Consumer.jpeg"; // Import Consumer background image

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
      {/* Navbar */}
      <Navbar />

      {/* Hero Section with Logo */}
      <div className="hero-section">
        <div className={`logo-container ${logoAnimated ? "animated" : ""}`}>
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
          style={{ backgroundImage: `url(${ConsumerImage})` }} // Add Consumer background
          onClick={() => navigate("/ConsumerSignup")}
        >
          <div className="card-content">
            <h2 className="card-title">Be A Consumer</h2>
            <p className="card-description">
              Learn art from courses, Buy Art Products, and explore the creative
              world.
            </p>
            <button className="card-button">Register Now</button>
          </div>
        </div>

        <div
          className="reg-card artisan-card"
          style={{ backgroundImage: `url(${ArtisanImage})` }} // Add Artisan background
          onClick={() => navigate("/ArtisanSignup")}
        >
          <div className="card-content">
            <h2 className="card-title">Be an Artisan</h2>
            <p className="card-description">
              Showcase your art to the world and connect with passionate
              consumers.
            </p>
            <button className="card-button">Register Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;