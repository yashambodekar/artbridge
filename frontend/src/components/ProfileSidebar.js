import React, { useEffect, useState } from "react";
import "./../styles/ProfileSidebar.css";

const ProfileSidebar = ({ isOpen, onClose }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (!isOpen) return;

    const token = localStorage.getItem("token");

    const fetchProfile = async () => {
      try {
        const res = await fetch("https://artisans-bridge.onrender.com/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.ok) setUser(data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };


    fetchProfile();
  }, [isOpen]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    onClose();
    window.location.href = "/";
  };


  return (
    <div className={`profile-sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-header">
        <h2>My Profile</h2>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>

      {user ? (
        <div className="profile-content">
          {user.profilePicture && (
            <img
              src={`http://localhost:5000/uploads/${user.profilePicture}`}
              alt="Profile"
              className="profile-pic"
            />
          )}
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>Contact:</strong> {user.contact || "N/A"}</p>
          <p><strong>Address:</strong> {user.address || "N/A"}</p>

          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default ProfileSidebar;
