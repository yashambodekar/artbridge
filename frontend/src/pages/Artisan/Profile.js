import React, { useState } from "react";
import "./../../styles/Profile.css"; // Create this CSS file

const Profile = () => {
  // Sample artisan data (replace with API data later)
  const [artisan, setArtisan] = useState({
    name: "John Doe",
    email: "john@example.com",
    contact: "+91 9876543210",
    address: "Mumbai, India",
    profileImage: "https://via.placeholder.com/150",
  });

  return (
    <div className="profile-container">
      <h1>My Profile</h1>

      <div className="profile-card">
        <img src={artisan.profileImage} alt="Profile" className="profile-pic" />
        <h2>{artisan.name}</h2>
        <p>Email: {artisan.email}</p>
        <p>Contact: {artisan.contact}</p>
        <p>Address: {artisan.address}</p>
        <button className="edit-profile-btn">Edit Profile</button>
      </div>

      <div className="sales-stats">
        <h2>Sales Statistics</h2>
        <p>Total Products Sold: 25</p>
        <p>Revenue Earned: ₹50,000</p>
      </div>
    </div>
  );
};

export default Profile;
