import React from "react";
import { Navigate, Outlet } from "react-router-dom";

// Function to check user authentication and role
const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

const PrivateRoute = ({ allowedRoles }) => {
  const user = getUser();

  // Debugging logs
  console.debug("PrivateRoute debug:", {
    user,
    allowedRoles,
    userRole: user?.role,
  });

  // If not authenticated, redirect to login
  if (!user) {
    console.log("User not authenticated. Redirecting to /Login.");
    return <Navigate to="/Login" replace />;
  }

  // If user's role is not allowed for this route
  if (!allowedRoles.includes(user.role)) {
    console.log("User role not authorized for this route.");

    // Role-based redirection to correct home
    switch (user.role) {
      case "Artisan":
        return <Navigate to="/Artisan/ArtisanHome" replace />;
      case "Consumer":
        return <Navigate to="/Consumer/ConsumerHome" replace />;
      default:
        return <Navigate to="/access-denied" replace />;
    }
  }

  // If authenticated and role is authorized
  console.log("User authorized. Rendering route.");
  return <Outlet />;
};

export default PrivateRoute;
