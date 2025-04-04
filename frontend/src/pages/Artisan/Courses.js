import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./../../styles/Courses.css"; // Create this CSS file

const Courses = () => {
  // Sample courses data (replace with API data later)
  const [courses] = useState([
    {
      id: 1,
      name: "Pottery Basics",
      price: "₹999",
      mode: "online",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Handmade Jewelry",
      price: "₹1299",
      mode: "offline",
      image: "https://via.placeholder.com/150",
    },
  ]);

  return (
    <div className="courses-container">
      <h1>Your Courses</h1>
      <Link to="/add-courses" className="new-course-btn">+ New Course</Link>

      <div className="courses-list">
        {courses.length > 0 ? (
          courses.map((course) => (
            <div key={course.id} className="course-card">
              <img src={course.image} alt={course.name} />
              <h3>{course.name}</h3>
              <p>Price: {course.price}</p>
              <p>Mode: {course.mode}</p>
            </div>
          ))
        ) : (
          <p>No courses added yet.</p>
        )}
      </div>
    </div>
  );
};

export default Courses;
