import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {
    const LoggedIn = window.localStorage.getItem("loggedIn")
    return LoggedIn==="true" ? <Outlet/> : <Navigate to={"/"} />
}

export default PrivateRoute