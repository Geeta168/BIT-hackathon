<<<<<<< HEAD
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Authform from "./components/authform.jsx";

import AVConsultation from "./components/AVConsultation.jsx";
import Room from "./components/Room.jsx";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Authform />} />
       
        <Route path="/AVConsultation" element={<AVConsultation/>}/>
        <Route path="/Room/:roomId" element={<Room/>}/>
      </Routes>
    </BrowserRouter>
  );
=======
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Tesseract from 'tesseract.js'
import Home from './pages/Home'
import About from './pages/About'
import Emergency from './pages/Emergency'
import Helpline from './pages/Helpline'
import PatientDashboard from './pages/PatientDashboard'
import Pharmacy from "./pages/Pharmacy";
import Privacy from './pages/Privacy'
import Services from './pages/Services'
import SymptomChecker from './pages/SymptomChecker'
import Consultation from './pages/Consultation'
import PrescriptionAlarm from './pages/PrescriptionAlarm'
import DoctorDashboard from "./pages/DoctorDashboard";
import SpecialtyDoctors from './pages/SpecialtyDoctors'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/emergency" element={<Emergency />} />
      <Route path="/helpline" element={<Helpline />} />
      <Route path="/patient" element={<PatientDashboard />} />
      
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/services" element={<Services />} />
      <Route path="/symptom-checker" element={<SymptomChecker />} />
      <Route path="/consultation" element={<Consultation />} />
      <Route path="/prescription" element={<PrescriptionAlarm />} />
      <Route path="/pharmacy" element={<Pharmacy />} />
      <Route path="/doctor" element={<DoctorDashboard />} />
      <Route path="/specialty" element={<SpecialtyDoctors />} />
      <Route path="/specialty/:name" element={<SpecialtyDoctors />} />
    </Routes>
  )

>>>>>>> 21bfc8e17500e38d45349fb7fe658fe686bfb231
}

export default App;
