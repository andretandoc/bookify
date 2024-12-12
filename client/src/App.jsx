import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

// Public components
import HomeBody from "./components/public/HomeBody";
import Login from "./components/public/Login";
import Register from "./components/public/Register";
import ApptForm from "./components/public/ApptForm";
import BookingForm from "./components/public/BookingForm"

// Route protection
import PrivateRoute from "./private-routes/privateRoutes";
import PublicRoute from "./public-routes/publicRoutes";

// Private components
import CreateBooking from "./components/private/createBooking";
import MemberPage from "./components/private/MemberPage";

import { useEffect } from "react";
import MeetingList from "./components/private/MeetingList";

function App() {
  // Clear token on app initialization
  useEffect(() => {
    localStorage.removeItem("token");
    console.log("Token cleared on app initialization");
  }, []); // might have to remove this later

  return (
    <Router>
      <Header />
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicRoute />}>
          <Route path="/" element={<HomeBody />} />
          <Route path="/ApptForm" element={<ApptForm />} />
          <Route path="/BookingForm" element={<BookingForm />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
        </Route>

        {/* Private Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/MemberPage" element={<MemberPage />} />
          <Route path="/CreateBooking" element={<CreateBooking />} />
          <Route path="/MeetingList" element={<MeetingList />} />
        </Route>

        {/* Catch-all route for 404s */}
        <Route path="*" element={<h1>Page not found</h1>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
