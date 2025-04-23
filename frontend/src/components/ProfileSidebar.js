import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/ProfileSidebar.css";

const ProfileSidebar = ({ isOpen, onClose }) => {
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) return;

    const token = localStorage.getItem("token");

    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/users/me", {
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

    // const fetchCourses = async () => {
    //   try {
    //     const endpoint = user?.role === "Artisan"
    //       ? "http://localhost:5000/api/artisans/my-courses-with-consumers"
    //       : "http://localhost:5000/api/consumers/my-courses";

    //     const res = await fetch(endpoint, {
    //       headers: { Authorization: `Bearer ${token}` },
    //     });

    //     const data = await res.json();
    //     if (res.ok) setCourses(data);
    //   } catch (err) {
    //     console.error("Error fetching courses:", err);
    //   }
    // };

    fetchProfile();
  }, [isOpen]);

  useEffect(() => {
    if (user) {
      fetchCourses(); // Fetch courses once user is loaded
    }

    async function fetchCourses() {
      try {
        const token = localStorage.getItem("token");
        const endpoint = user?.role === "Artisan"
          ? "http://localhost:5000/api/users/my-courses-with-consumers"
          : "http://localhost:5000/api/users/my-courses";

        const res = await fetch(endpoint, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        if (res.ok) setCourses(data);
      } catch (err) {
        console.error("Error fetching courses:", err);
      }
    }
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    onClose();
    window.location.href = "/";
  };

  const handleCourseClick = (courseId) => {
    if (user.role === "Artisan") {
      navigate(`/course/manage/${courseId}`);
    } else {
      navigate(`/course/view/${courseId}`);
    }
    onClose(); // Close sidebar after navigating
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

          <h3>{user.role === "Artisan" ? "Sold Courses" : "Purchased Courses"}</h3>
          <ul>
            {courses.length > 0 ? (
              courses.map((course) => (
                <li key={course._id} onClick={() => handleCourseClick(course._id)} style={{ cursor: "pointer" }}>
                  {course.name} - ₹{course.price}
                  {user.role === "Artisan" && (
                    <span style={{ float: "right", color: "#777" }}>
                      ({course.consumersCount || 0} enrolled)
                    </span>
                  )}
                </li>
              ))
            ) : (
              <li>No courses found.</li>
            )}
          </ul>

          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default ProfileSidebar;
