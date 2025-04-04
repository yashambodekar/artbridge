import React from "react";
import { Navigate, Outlet } from "react-router-dom";

// Function to check user authentication and role
const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

const PrivateRoute = ({ allowedRoles }) => {
  const user = getUser();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(user.role)) {
    // Redirect to the appropriate home page if the role does not match
    return user.role === "artisan" ? <Navigate to="/artisan-home" /> : <Navigate to="/consumer-home" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
