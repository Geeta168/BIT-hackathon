import { useState } from "react";
import Navbar from "../components/Navbar";
import EmergencyButtons from "../components/EmergencyButtons";
import DoctorList from "../components/DoctorList";
import AmbulanceList from "../components/AmbulanceList";
import CallModal from "../components/CallModal";

/*
 Uses the same layout/structure as your HTML.
 Doctor image uses uploaded file path:
  -> /mnt/data/5f90954d-963c-496c-a87c-a9d4d4b02b93.png
*/

export default function Emergency() {
  const [mode, setMode] = useState(null); // 'video' | 'audio' | null
  const [showDoctors, setShowDoctors] = useState(false);
  const [showAmbulances, setShowAmbulances] = useState(false);
  const [callInfo, setCallInfo] = useState(null); // { roomName, doctorName, isVideo }

  function openDoctors(type) {
    setMode(type);
    setShowAmbulances(false);
    setShowDoctors(true);
  }

  function openAmbulances() {
    setShowDoctors(false);
    setShowAmbulances(true);
  }

  function startCall(doctorName, isVideo) {
    const roomName = "doctor-" + doctorName.replace(/\s+/g, "-");
    setCallInfo({ roomName, doctorName, isVideo });
  }

  return (
    <div className="page-root">
      <Navbar />
      <h1 className="page-title">Emergency Services</h1>

      <div className="emergency-container">
        <EmergencyButtons
          onVideo={() => openDoctors("video")}
          onAudio={() => openDoctors("audio")}
          onAmbulance={() => openAmbulances()}
        />

        <div className="list-container">
          <DoctorList
            visible={showDoctors}
            type={mode}
            onCall={(name, type) => startCall(name, type === "video")}
          />
          <AmbulanceList visible={showAmbulances} />
        </div>
      </div>

      <footer>© 2025 HealTech | <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a></footer>

      <CallModal
        callInfo={callInfo}
        onClose={() => setCallInfo(null)}
      />
    </div>
  );
}
