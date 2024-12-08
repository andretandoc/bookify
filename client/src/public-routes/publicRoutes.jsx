import { Outlet, Navigate } from "react-router-dom";

const PublicRoute = () => {
    const LoggedIn = window.localStorage.getItem("loggedIn")
    return (LoggedIn==="false" ? <Navigate to={"/"} /> : <Outlet/>)
    
}

export default PublicRoute