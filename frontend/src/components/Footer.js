import React from "react";
import "../styles/Footer.css"; // Footer styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© {new Date().getFullYear()} ArtBridge. All rights reserved.</p>
        <ul className="footer-links">
          <li><a href="/about">About Us</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="/privacy">Privacy Policy</a></li>
          <li><a href="/terms">Terms of Service</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
