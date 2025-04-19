import React, { useState } from "react";
import ArtisanNavbar from "../../components/ArtisanNavbar";
import { Outlet } from "react-router-dom";
import ProfileSidebar from "../../components/ProfileSidebar";

const ArtisanLayout = () => {
  const [showProfileSidebar, setShowProfileSidebar] = useState(false);

  const toggleProfileSidebar = () => {
    setShowProfileSidebar(!showProfileSidebar);
  };

  return (
    <div>
      <ArtisanNavbar onProfileClick={toggleProfileSidebar} />

      {/* ✅ Always render the sidebar, just toggle visibility */}
      <ProfileSidebar isOpen={showProfileSidebar} onClose={toggleProfileSidebar} />

      <div style={{ padding: "20px" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default ArtisanLayout;
