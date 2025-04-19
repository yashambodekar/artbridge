import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../../styles/Profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", contact: "", address: "" });
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/login");

      const res = await fetch("http://localhost:5000/api/users/me", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (res.ok) {
        setUser(data);
        setFormData({ name: data.name, contact: data.contact, address: data.address });
      } else {
        navigate("/login");
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/users/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const updated = await res.json();
      setUser(updated);
      setEditing(false);
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) return <p>Loading profile...</p>;

  return (
    <div className="profile-sidebar">
      <h2>My Profile</h2>
      {user ? (
        <div className="profile-card">
          {user.profilePicture && (
            <img
              src={`http://localhost:5000/uploads/${user.profilePicture}`}
              alt="Profile"
              className="profile-pic"
            />
          )}

          {editing ? (
            <>
              <input type="text" name="name" value={formData.name} onChange={handleChange} />
              <input type="text" name="contact" value={formData.contact} onChange={handleChange} />
              <input type="text" name="address" value={formData.address} onChange={handleChange} />
              <button onClick={handleUpdate}>Save</button>
            </>
          ) : (
            <>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Role:</strong> {user.role}</p>
              <p><strong>Contact:</strong> {user.contact || "N/A"}</p>
              <p><strong>Address:</strong> {user.address || "N/A"}</p>
              <button onClick={() => setEditing(true)}>Edit Profile</button>
            </>
          )}

          <h3>Sold Products</h3>
          {user.soldProducts?.length ? (
            <ul>
              {user.soldProducts.map((p) => (
                <li key={p._id}>{p.name} - ₹{p.price}</li>
              ))}
            </ul>
          ) : (
            <p>No products sold yet.</p>
          )}

          <h3>Sold Courses</h3>
          {user.soldCourses?.length ? (
            <ul>
              {user.soldCourses.map((c) => (
                <li key={c._id}>{c.name} - ₹{c.price}</li>
              ))}
            </ul>
          ) : (
            <p>No courses sold yet.</p>
          )}

          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      ) : (
        <p>Could not load profile data.</p>
      )}
    </div>
  );
};

export default Profile;
