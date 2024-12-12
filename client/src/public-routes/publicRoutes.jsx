import { Outlet, Navigate } from "react-router-dom";

const PublicRoute = () => {
    const token = localStorage.getItem("token");
    // If no token, redirect to login
    if (token) {
        console.log("No token found. Redirecting to /Login");
        return <Navigate to="/" />;
    }

    // If token exists, allow access to private route
    console.log("Token found:", token);
    return <Outlet />;
    
}

export default PublicRoute