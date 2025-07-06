import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./../components/Navbar"; // Import the Navbar component
import "./../styles/OurArtisan.css";
import defaultProfileIcon from "./../assets/profile.png";

const OurArtisans = () => {
  const [artisans, setArtisans] = useState([]);

  useEffect(() => {
    const fetchArtisans = async () => {
      try {
        const res = await axios.get("https://artisans-bridge.onrender.com/api/users/artisans");
        setArtisans(res.data);
      } catch (error) {
        console.error("Error fetching artisans:", error);
      }
    };

    fetchArtisans();
  }, []);

  return (
    <div className="our-artisans-container">
      {/* Navbar */}
      <Navbar />

      <h1>Our Artisans</h1>
      <div className="artisan-grid">
        {artisans.map((artisan) => (
          <div className="artisancard" key={artisan.id}>
            <img
              src={artisan.profilePicture || defaultProfileIcon}
              alt={artisan.name}
              className="artisan-profile-picture"
            />
            <h2>{artisan.name}</h2>
            <p>Courses Created: {artisan.courseCount}</p>
            <p>Products Made: {artisan.productCount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurArtisans;
