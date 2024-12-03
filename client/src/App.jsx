import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import ApiTest from "./components/ApiTest";

// i added examples of routing using react router dom

function App() {
  return (
    <Router>
      <nav>
        <Link to="/apitest">API Test Page</Link>
      </nav>
      <Routes>
        {/* Add a route for the API Test component */}
        <Route path="/" element={<h1>Welcome to Bookify</h1>} />
        <Route path="/apitest" element={<ApiTest />} />
        {/* Other routes... */}
      </Routes>
    </Router>
  );
}

export default App;
