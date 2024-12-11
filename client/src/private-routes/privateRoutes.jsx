import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const token = localStorage.getItem("token");

  // If no token, redirect to login
  if (!token) {
    console.log("No token found. Redirecting to /Login");
    return <Navigate to="/Login" />;
  }

  // If token exists, allow access to private route
  console.log("Token found:", token);
  return <Outlet />;
};

export default PrivateRoute;
