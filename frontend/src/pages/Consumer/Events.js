import React, { useState } from "react";
import "./../../styles/Events.css"; // Create this CSS file

const Events = () => {
  // Sample event data (replace with API data later)
  const [events] = useState([
    {
      id: 1,
      name: "Handmade Jewelry Workshop",
      date: "April 10, 2025",
      location: "Mumbai",
      description: "Learn how to craft unique handmade jewelry pieces with professional artisans.",
    },
    {
      id: 2,
      name: "Pottery Making Class",
      date: "April 15, 2025",
      location: "Bangalore",
      description: "Discover the art of pottery and make your own ceramic masterpiece.",
    },
    {
      id: 3,
      name: "Painting with Natural Colors",
      date: "April 20, 2025",
      location: "Delhi",
      description: "A creative painting workshop using eco-friendly and natural colors.",
    },
  ]);

  const handleEnroll = (eventId) => {
    alert(`You have enrolled in event ID: ${eventId}`);
    // Later, integrate with backend API
  };

  return (
    <div className="events-container">
      <h1>Upcoming Events</h1>

      <div className="events-list">
        {events.map((event) => (
          <div key={event.id} className="event-card">
            <h2>{event.name}</h2>
            <p><strong>Date:</strong> {event.date}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <p>{event.description}</p>
            <button className="enroll-btn" onClick={() => handleEnroll(event.id)}>Enroll</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;