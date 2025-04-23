import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./../../styles/Courses.css";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please log in to view your courses.");
        setLoading(false);
        return;
      }

      const response = await fetch("http://localhost:5000/api/courses/my", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch courses");
      }

      setCourses(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleDelete = async (courseId) => {
    const confirm = window.confirm("Are you sure you want to delete this course?");
    if (!confirm) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/courses/delete/${courseId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to delete course");

      setCourses(courses.filter((c) => c._id !== courseId));
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="courses-container">
      <h1>Your Courses</h1>
      <Link to="/Artisan/AddCourse" className="new-course-btn">+ New Course</Link>

      {loading ? (
        <p>Loading courses...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : courses.length === 0 ? (
        <p>No courses added yet.</p>
      ) : (
        <div className="courses-list">
          {courses.map((course) => (
            <div key={course._id} className="course-card">
              <img
                src={course.image ? `http://localhost:5000/${course.image}` : "https://via.placeholder.com/150"}
                alt={course.name}
                className="course-image"
              />
              <h3>{course.name}</h3>
              <p>{course.mode}</p>
              <p>Price: ₹{course.price}</p>

              <div className="product-card button">
              <button onClick={() => navigate(`/Artisan/ManageCourse/${course._id}`)}>Manage Content</button>
                <button className="delete-btn" onClick={() => handleDelete(course._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Courses;
