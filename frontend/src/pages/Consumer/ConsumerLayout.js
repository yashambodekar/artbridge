// pages/Consumer/ConsumerLayout.js
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import ConsumerNavbar from "../../components/ConsumerNavbar";
import ProfileSidebar from "../../components/ProfileSidebar";

const ConsumerLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <ConsumerNavbar onProfileClick={toggleSidebar} />
      <ProfileSidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
      <main style={{ marginTop: "80px" }}>
        <Outlet />
      </main>
    </>
  );
};

export default ConsumerLayout;
