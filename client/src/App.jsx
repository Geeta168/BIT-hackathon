import { BrowserRouter, Routes, Route } from "react-router-dom";
import Authform from "./components/authform.jsx";
import Dashboard from "./components/Dashboard.jsx";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login / Signup page */}
        <Route path="/" element={<Authform />} />

        {/* Dashboard page */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
