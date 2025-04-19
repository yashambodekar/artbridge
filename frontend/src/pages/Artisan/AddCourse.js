import React, { useState } from "react";
import "./../../styles/AddCourse.css"; // Make sure to create this CSS file for styling

const AddCourse = () => {
  const [course, setCourse] = useState({
    name: "",
    description: "",
    price: "",
    mode: "online",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };

  const handleImageChange = (e) => {
    setCourse({ ...course, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", course.name);
    formData.append("description", course.description);
    formData.append("price", course.price);
    formData.append("mode", course.mode);
    formData.append("image", course.image);

    try {

      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please log in to add a course.");
        return;
      }

      const response = await fetch("http://localhost:5000/api/courses/add", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        alert("Course added successfully!");
        setCourse({ name: "", description: "", price: "", mode: "Online", image: null });
      } else {
        const err = await response.json();
        alert("Error adding course!" + err.message || "Unknown error occurred.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="add-course-container">
      <h2>Add New Course</h2>
      <form onSubmit={handleSubmit} className="add-course-form">
        <input
          type="text"
          name="name"
          placeholder="Course Name"
          value={course.name}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Course Description"
          value={course.description}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={course.price}
          onChange={handleChange}
          required
        />
        <select name="mode" value={course.mode} onChange={handleChange}>
          <option value="online">Online</option>
          <option value="offline">Offline</option>
        </select>
        <input type="file" accept="image/*" onChange={handleImageChange} required />
        <button type="submit">Add Course</button>
      </form>
    </div>
  );
};

export default AddCourse;
