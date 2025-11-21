<<<<<<< HEAD
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
=======
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Home />
    </>
>>>>>>> 988ddaab1a9873fa30280ea367ccde96efd8c73b
  );
}

export default App;
