import React from "react";
import { Navigate, Outlet } from "react-router-dom";

// Function to check user authentication (Modify as per your authentication logic)
const isAuthenticated = () => {
  return localStorage.getItem("token") !== null;
};

const PrivateRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;