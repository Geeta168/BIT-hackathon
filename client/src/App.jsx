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
}

export default App;
