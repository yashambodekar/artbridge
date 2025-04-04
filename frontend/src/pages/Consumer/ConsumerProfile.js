import React, { useState } from "react";
import "./../../styles/ConsumerProfile.css"; // Create this CSS file
import { useNavigate } from "react-router-dom";

const ConsumerProfile = () => {
  const navigate = useNavigate();

  // Sample consumer data (replace with API data later)
  const [consumer, setConsumer] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    contact: "9876543210",
    address: "123, Artisan Street, Mumbai",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [updatedConsumer, setUpdatedConsumer] = useState({ ...consumer });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setConsumer(updatedConsumer);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setUpdatedConsumer({ ...updatedConsumer, [e.target.name]: e.target.value });
  };

  return (
    <div className="consumer-profile">
      <h1>My Profile</h1>

      <div className="profile-card">
        {isEditing ? (
          <>
            <input type="text" name="name" value={updatedConsumer.name} onChange={handleChange} />
            <input type="email" name="email" value={updatedConsumer.email} onChange={handleChange} />
            <input type="text" name="contact" value={updatedConsumer.contact} onChange={handleChange} />
            <input type="text" name="address" value={updatedConsumer.address} onChange={handleChange} />
            <button className="save-btn" onClick={handleSave}>Save</button>
          </>
        ) : (
          <>
            <p><strong>Name:</strong> {consumer.name}</p>
            <p><strong>Email:</strong> {consumer.email}</p>
            <p><strong>Contact:</strong> {consumer.contact}</p>
            <p><strong>Address:</strong> {consumer.address}</p>
            <button className="edit-btn" onClick={handleEdit}>Edit Profile</button>
          </>
        )}

        <div className="profile-buttons">
          <button className="orders-btn" onClick={() => navigate("/orders")}>Orders</button>
          <button className="courses-btn" onClick={() => navigate("/enrolled-courses")}>Enrolled Courses</button>
        </div>
      </div>
    </div>
  );
};

export default ConsumerProfile;
