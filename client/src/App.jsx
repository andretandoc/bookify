import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeBody from "./components/HomeBody";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import ApptForm from "./components/ApptForm";
import BookingForm from "./components/BookingForm";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomeBody />} />
        <Route path="/ApptForm" element={<ApptForm />} />
        <Route path="/BookingForm" element={<BookingForm />} />
        <Route path="/LoginForm" element={<LoginForm />} />
        <Route path="/RegisterForm" element={<RegisterForm />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
