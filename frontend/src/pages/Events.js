import React from "react";
import Navbar from "./../components/Navbar";
import "./../styles/Events.css"; // Ensure this CSS file exists

const Events = () => {
  // Updated event data
  const events = [
    {
      id: 1,
      name: "Kalaa Spandan Art Fair – May 2025 (Pune 3rd Edition)",
      description:
        "A leading and affordable contemporary art fair in India, the Kalaa Spandan Art Fair is not just a trade fair but also an event of artistic enlightenment. It combines exhibitions with talent hunts, building a unique bridge between masters and emerging artists.",
      location: "Siddhi Banquet Hall, DP Road, Vakil Nagar, Near Mhatre Bridge, Erandawane, Pune-4",
      dates: "May 2–4, 2025",
      time: "12:00 PM – 9:00 PM IST",
      enrollmentLink: "https://indianartfair.net.in/events/kalaa-spandan-art-fair-april-2025-pune-3rd-edition/",
    },
    {
      id: 2,
      name: "Pune Art Festival 2025",
      description:
        "An exhibition featuring renowned artists from India and abroad, showcasing a diverse range of artworks.",
      location: "Balgandharva Rangmandir, Pune",
      dates: "March 10–15, 2025",
      enrollmentLink: "https://automation.in.net", // Placeholder link
    },
    {
      id: 3,
      name: "Pratibha 2025 – Annual Arts Fest",
      description:
        "Chinmaya Vishwa Vidyapeeth’s annual arts festival featuring live band performances, musical concerts, classical and folk dance performances, and various competitions in music, dance, and theater.",
      location: "Onakkoor Facility, Chinmaya Vishwa Vidyapeeth, Ernakulam, Kerala",
      dates: "March 18, 2025",
      enrollmentLink: "https://www.cvv.ac.in/events/pratibha-2025-annual-arts-fest",
    },
    {
      id: 4,
      name: "Global Art & Design Education Expo – Pune 2025",
      description:
        "An education fair focused on art and design, providing students with information on educational and career opportunities in the art and design space.",
      location: "Pune, Maharashtra (Exact venue to be announced)",
      dates: "August 22, 2025",
      time: "3:15 PM – 7:00 PM IST",
      enrollmentLink: "https://tradeindia.com", // Placeholder link
    },
    {
      id: 5,
      name: "Pune: Environment Theatre Festival 2025 – Grand Finale",
      description:
        "A festival highlighting creativity and environmental consciousness among Pune’s youth, featuring theater productions using recyclable materials.",
      location: "Chittaranjan Vatika Garden, Model Colony, Pune",
      dates: "January 25, 2025",
      time: "9:30 AM onwards",
      enrollmentLink: "mailto:[email protected]", // Email link
    },
  ];

  const handleEnroll = (link) => {
    window.open(link, "_blank"); // Open the enrollment link in a new tab
  };

  return (
    <div className="events-page">
      {/* Navbar */}
      <Navbar />

      <div className="events-container">
        <h1>Upcoming Events</h1>

        <div className="events-list">
          {events.map((event) => (
            <div key={event.id} className="event-card">
              <h2>{event.name}</h2>
              <p><strong>Description:</strong> {event.description}</p>
              <p><strong>Location:</strong> {event.location}</p>
              <p><strong>Dates:</strong> {event.dates}</p>
              {event.time && <p><strong>Time:</strong> {event.time}</p>}
              <button
                className="enroll-btn"
                onClick={() => handleEnroll(event.enrollmentLink)}
              >
                Enroll
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;