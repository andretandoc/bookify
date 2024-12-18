import { Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

const PrivateRoute = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Update the login state based on token presence
  }, []);

  // If no token, redirect to login
  if (!isLoggedIn) {
    console.log("No token found. Redirecting to /Login");
    return <Navigate to="/Login" />;
  }

  // If token exists, allow access to private route
  console.log("Token found:", localStorage.getItem("token"));
  return <Outlet />;
};

export default PrivateRoute;
