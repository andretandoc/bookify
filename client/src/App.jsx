// Karl Wehbe & Andre Tandoc

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useLocation } from "react-router-dom";

import Header from "./components/Header";

// Public components
import HomeBody from "./components/public/HomeBody";
import Login from "./components/public/Login";
import Register from "./components/public/Register";
import ApptForm from "./components/public/ApptForm";
import ApptList from "./components/public/ApptList";
import PublicEvents from "./components/public/PublicEvents";

// Route protection
import PrivateRoute from "./private-routes/privateRoutes";
import PublicRoute from "./public-routes/publicRoutes";

// Private components
import CreateEvent from "./components/private/createEvent";
import MemberPage from "./components/private/MemberPage";
import ManageBooking from "./components/private/ManageBooking";
import CustomMeeting from "./components/private/CustomMeeting";
import ManageEvent from "./components/private/ManageEvent";
import FullEvents from "./components/private/FullEvents";
import URLTest from "./components/private/URLtest";

import { useState, useEffect } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => !!localStorage.getItem("token")
  );

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear the token
    setIsLoggedIn(false);
    window.location.href = "/"; // Redirect to the landing page
  };

  const privateRoutes = [
    "/MemberPage",
    "/ManageBooking",
    "/CustomMeeting",
    "/ManageEvent",
    "/CreateEvent",
    "/booking/:publicURL",
    "/URLTest",
  ];

  const isPrivateRoute = privateRoutes.some((route) =>
    location.pathname.startsWith(route.split("/:")[0])
  );

  return (
    <div className={isPrivateRoute ? "private-page" : "public-page"}>
      <Router>
        <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicRoute isLoggedIn={isLoggedIn} />}>
            <Route path="/" element={<HomeBody />} />
            <Route path="/ApptForm" element={<ApptForm />} />
            <Route path="/ApptList" element={<ApptList />} />
            <Route path="/PublicEvents" element={<PublicEvents />} />
            <Route
              path="/Login"
              element={<Login setIsLoggedIn={setIsLoggedIn} />}
            />
            <Route
              path="/Register"
              element={<Register setIsLoggedIn={setIsLoggedIn} />}
            />
          </Route>

          {/* Private Routes */}
          <Route element={<PrivateRoute isLoggedIn={isLoggedIn} />}>
            <Route path="/MemberPage" element={<MemberPage />} />
            <Route path="/ManageBooking" element={<ManageBooking />} />
            <Route path="/CustomMeeting" element={<CustomMeeting />} />
            <Route path="/ManageEvent" element={<ManageEvent />} />
            <Route path="/CreateEvent" element={<CreateEvent />} />
            <Route path="/FullEvents" element={<FullEvents />} />
            {/* <Route path="/booking/:publicURL" element={<URLTest />} /> */}
            <Route path="/URLTest" element={<URLTest />} />
          </Route>

          {/* Public and Private Route */}
          <Route path="/booking/:publicURL" element={<URLTest />} />

          {/* Catch-all route for 404s */}
          <Route path="*" element={<h1>Page not found</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
