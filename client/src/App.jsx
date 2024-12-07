import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeBody from "./components/public/HomeBody";
import Login from "./components/public/Login";
import Register from "./components/public/Register";
import ApptForm from "./components/public/ApptForm";
import BookingForm from "./components/public/BookingForm";
import MemberPage from "./components/private/MemberPage";
import useToken from './useToken';



function App() {
    const { token, setToken } = useToken();

    return (
        <Router>
        <Header />
        <Routes>
            <Route path="/" element={<HomeBody />} />
            <Route path="/ApptForm" element={<ApptForm />} />
            <Route path="/BookingForm" element={<BookingForm />} />
            <Route path="/Login" element={<Login setToken={setToken} />} />
            <Route path="/Register" element={<Register />} />
            <Route path="*" element={<h1>Page not found</h1>} />
        </Routes>
        <Footer />
        </Router>
    );
}

export default App;
