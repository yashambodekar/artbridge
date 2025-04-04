import React, { useState } from "react";
import "./../../styles/ConsumerCourses.css"; // Create this CSS file
import { useNavigate } from "react-router-dom";

const ConsumerCourses = () => {
  const navigate = useNavigate();

  // Sample courses (replace with API data later)
  const [courses] = useState([
    {
      id: 1,
      name: "Pottery Making",
      price: 1500,
      mode: "Offline",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Painting Techniques",
      price: 2000,
      mode: "Online",
      image: "https://via.placeholder.com/150",
    },
  ]);

  return (
    <div className="courses-container">
      <h1>Available Courses</h1>
      
      <div className="courses-grid">
        {courses.map((course) => (
          <div key={course.id} className="course-card">
            <img src={course.image} alt={course.name} className="course-image" />
            <div className="course-details">
              <h2>{course.name}</h2>
              <p>Mode: {course.mode}</p>
              <p className="price">₹{course.price}</p>
              <button className="enroll-btn" onClick={() => navigate(`/enroll/${course.id}`)}>
                Enroll
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConsumerCourses;
