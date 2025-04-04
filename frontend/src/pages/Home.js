import React from "react";
import { useNavigate } from "react-router-dom";
import "./../../styles/Home.css"; // Make sure this CSS file exists
import Footer from "./../components/Footer";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="background-image">
        <div className="overlay">
          <h1>Welcome to Artisan Connect</h1>
          <p>A platform bridging artisans and consumers for unique handmade products.</p>
          <button onClick={() => navigate("/Login")}>Login</button>
        </div>
      </div>
      <div className="about-section">
        <h2>About Us</h2>
        <p>
          Artbridge is an online marketplace that empowers local artisans to showcase
          and sell their handmade products directly to consumers. We support small businesses
          by providing a seamless shopping experience.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
