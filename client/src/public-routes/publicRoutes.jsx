// Karl Wehbe & Andre Tandoc

import { Outlet, Navigate } from "react-router-dom";

const PublicRoute = () => {
  const token = localStorage.getItem("token");

  // If a token exists, redirect logged-in users to the private dashboard
  if (token) {
    return <Navigate to="/MemberPage" />;
  }

  // If no token exists, allow access to public pages
  return <Outlet />;
};

export default PublicRoute;
