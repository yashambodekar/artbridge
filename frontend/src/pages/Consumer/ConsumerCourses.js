import React, { useEffect, useState } from "react";
import "./../../styles/ConsumerCourses.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ConsumerCourses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]); // All available courses
  const [purchasedCourses, setPurchasedCourses] = useState([]); // Courses purchased by the consumer
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch available courses and purchased courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token");

        // Fetch all available courses
        const availableCoursesRes = await axios.get("http://localhost:5000/api/courses/AllCourses");
        setCourses(availableCoursesRes.data);

        // Fetch purchased courses
        const purchasedCoursesRes = await axios.get("http://localhost:5000/api/courses/purchased", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPurchasedCourses(purchasedCoursesRes.data);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError("Failed to load courses. Please try again later.");
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return <div className="courses-container"><h2>Loading courses...</h2></div>;
  }

  if (error) {
    return <div className="courses-container"><h2>{error}</h2></div>;
  }

  const handleBuy = async (courseId) => {
    const confirm = window.confirm("Proceed to buy this course?");
    if (!confirm) return;

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(`http://localhost:5000/api/courses/buy/${courseId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Purchase successful!");
      // Refresh purchased courses after buying
      const purchasedCoursesRes = await axios.get("http://localhost:5000/api/courses/purchased", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPurchasedCourses(purchasedCoursesRes.data);
    } catch (err) {
      console.error("Purchase error:", err);
      alert(err.response?.data?.message || "Purchase failed.");
    }
  };

  const handleViewCourse = (courseId) => {
    navigate(`/Consumer/ViewCourse/${courseId}`);
  };

  return (
    <div className="courses-container">
      <h1>Available Courses</h1>

      <div className="courses-grid">
        {courses.map((course) => (
          <div key={course._id} className="course-card">
            <img
              src={course.image ? `http://localhost:5000/${course.image}` : "https://via.placeholder.com/150"}
              alt={course.name}
              className="course-image"
            />
            <div className="course-details">
              <h2>{course.name}</h2>
              <p>By: <strong>{course.artisan?.name || "Unknown"}</strong></p>
              <p>{course.description}</p>
              <p>Mode: {course.mode}</p>
              <p className="price">₹{course.price}</p>
              <button className="enroll-btn" onClick={() => handleBuy(course._id)}>
                Buy Course
              </button>
            </div>
          </div>
        ))}
      </div>

      <h1>My Courses</h1>
      <div className="courses-grid">
        {purchasedCourses.map((course) => (
          <div key={course._id} className="course-card">
            <img
              src={course.image ? `http://localhost:5000/${course.image}` : "https://via.placeholder.com/150"}
              alt={course.name}
              className="course-image"
            />
            <div className="course-details">
              <h2>{course.name}</h2>
              <p>By: <strong>{course.artisan?.name || "Unknown"}</strong></p>
              <p>{course.description}</p>
              <p>Mode: {course.mode}</p>
              <button className="view-btn" onClick={() => handleViewCourse(course._id)}>
                View Course
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConsumerCourses;