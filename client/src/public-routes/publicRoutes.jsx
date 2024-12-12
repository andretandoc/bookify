import { Outlet, Navigate } from "react-router-dom";

const PublicRoute = () => {
  const token = localStorage.getItem("token");

  // If a token exists, redirect logged-in users to the private dashboard
  if (token) {
    console.log("Token found. Redirecting to /MemberPage");
    return <Navigate to="/MemberPage" />;
  }

  // If no token exists, allow access to public pages
  console.log("No token found. Allowing access to public routes");
  return <Outlet />;
};

export default PublicRoute;
