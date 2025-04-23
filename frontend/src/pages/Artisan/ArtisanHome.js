import React, { useEffect, useState } from "react";
import axios from "axios";
import "./../../styles/ArtisanHome.css";

const ArtisanHome = () => {
  const [stats, setStats] = useState({
    productsCreated: 0,
    coursesCreated: 0,
    productsSold: 0,
    coursesSold: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token"); // Get the token from localStorage
        const res = await axios.get("http://localhost:5000/api/users/artisan/stats", {
          headers: {
            Authorization: `Bearer ${token}`, // Add the token to the Authorization header
          },
        });
        setStats(res.data);
        console.log("Artisan Stats:", res.data); // Debugging log
      } catch (error) {
        console.error("Error fetching artisan stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="artisan-content">
      <h1>Welcome, Artisan!</h1>
      <p>Manage your products, courses, and sales all in one place.</p>

      {/* Artisan Statistics Section */}
      <div className="artisan-stats">
        <div className="stat-card">
          <h3>Products Created</h3>
          <p>{stats.productsCreated}</p>
        </div>
        <div className="stat-card">
          <h3>Courses Created</h3>
          <p>{stats.coursesCreated}</p>
        </div>
      </div>
    </div>
  );
};

export default ArtisanHome;