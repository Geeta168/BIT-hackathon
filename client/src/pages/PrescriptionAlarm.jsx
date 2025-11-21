import { useState } from "react";
import { Link } from 'react-router-dom'
import Tesseract from "tesseract.js";

export default function PrescriptionAlarm() {
  const [preview, setPreview] = useState(null);
  const [extractedInfo, setExtractedInfo] = useState("");
  const [manualInfo, setManualInfo] = useState("");

  // controlled manual inputs
  const [manualPatient, setManualPatient] = useState("");
  const [manualAge, setManualAge] = useState("");
  const [manualDate, setManualDate] = useState("");
  const [manualMeds, setManualMeds] = useState("");

  // Request notification permission
  if (Notification.permission !== "granted") {
    Notification.requestPermission();
  }

  // Alarm audio
  const alarmSound = new Audio("https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg");

  // ----------------------- OCR UPLOAD ---------------------------------
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image")) {
      alert("Please upload an image.");
      return;
    }

    const reader = new FileReader();
    reader.onload = async (ev) => {
      setPreview(ev.target.result);
      try {
        const result = await Tesseract.recognize(ev.target.result, "eng");
        const text = result.data.text;
        extractText(text, "upload");
      } catch (err) {
        console.error('OCR error:', err);
        setExtractedInfo('<p style="color: #ffdddd;">OCR failed: ' + (err.message || err) + '</p>');
        alert('OCR failed: ' + (err.message || err));
      }
    };
    reader.readAsDataURL(file);
  };

  // ---------------------- Manual SAVE ----------------------------------
  const handleManualSave = () => {
    const patient = manualPatient || "Unknown";
    const age = manualAge || "N/A";
    const date = manualDate || "N/A";
    const meds = (manualMeds || "")
      .split("\n")
      .map(m => m.trim())
      .filter((m) => m !== "");

    displayAndAsk(patient, age, date, meds, "manual");
  };

  // ------------------ Extract OCR text --------------------------------
  const extractText = (text, type) => {
    const patient = (text.match(/Patient:\s*(.*)/i) || [])[1] || "Unknown";
    const age = (text.match(/Age:\s*(\d+)/i) || [])[1] || "N/A";
    const date = (text.match(/Date:\s*(.*)/i) || [])[1] || "N/A";
    const meds = text.match(/[\d]+\.\s.*\d{1,2}:\d{2}\s*(AM|PM)/gi) || [];

    displayAndAsk(patient, age, date, meds, type);
  };

  // ------------------ Render & Ask -----------------------------------
  const displayAndAsk = (patient, age, date, meds, type) => {
    const html = `
      <h3>Extracted Info</h3>
      <p><strong>Patient:</strong> ${patient}</p>
      <p><strong>Age:</strong> ${age}</p>
      <p><strong>Date:</strong> ${date}</p>
      <p><strong>Medicines:</strong></p>
      <ul>${meds.map((m) => `<li>${m}</li>`).join("")}</ul>
    `;

    if (type === "upload") setExtractedInfo(html);
    else setManualInfo(html);

    if (meds.length === 0) return;

    if (window.confirm("Set alarms for these medicines?")) {
      scheduleAlarms(meds);

      const msg = "<p>⏰ Alarms scheduled successfully!</p>";
      if (type === "upload") setExtractedInfo(html + msg);
      else setManualInfo(html + msg);
    }
  };

  // ---------------- Alarm Scheduling -----------------------
  const scheduleAlarms = (meds) => {
    meds.forEach((med) => {
      const match = med.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
      if (!match) return;

      let hour = parseInt(match[1]);
      const minute = parseInt(match[2]);
      const ampm = match[3].toUpperCase();

      if (ampm === "PM" && hour !== 12) hour += 12;
      if (ampm === "AM" && hour === 12) hour = 0;

      const now = new Date();
      let alarmTime = new Date();
      alarmTime.setHours(hour, minute, 0, 0);

      if (alarmTime < now) alarmTime.setDate(alarmTime.getDate() + 1);

      const diff = alarmTime - now;

      setTimeout(() => {
        alarmSound.play();
        alert(`💊 Time to take: ${med}`);

        if (Notification.permission === "granted") {
          new Notification("Medicine Reminder", { body: `Take: ${med}` });
        }
      }, diff);
    });
  };

  // -------------------- UI ------------------------------

  return (
    <div style={styles.page}>
      <nav style={styles.navbar}>
        <div style={styles.logo}>HealTech</div>
        <ul style={styles.navLinks}>
          <li><Link to="/">🏠 Home</Link></li>
          <li><Link to="/patient">👩‍⚕️ Dashboard</Link></li>
          <li><Link to="/consultation">💬 Consultation</Link></li>
          <li><Link to="/prescription">📄 Prescriptions</Link></li>
        </ul>
      </nav>

      <div style={styles.container}>
        {/* Upload Card */}
        <div style={styles.card}>
          <h2>📤 Upload Prescription</h2>
          <div style={{ marginTop: 12 }}>
            <input type="file" accept="image/*" onChange={handleFileUpload} />
          </div>

          {preview && (
            <img src={preview} alt="preview" style={styles.preview} />
          )}

          <div
            style={{ ...styles.info, minHeight: 40 }}
            dangerouslySetInnerHTML={{ __html: extractedInfo }}
          />
        </div>

        {/* Manual Entry */}
        <div style={styles.card}>
          <h2>✍️ Manual Entry</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <input
              id="manualPatient"
              placeholder="Patient Name"
              value={manualPatient}
              onChange={(e) => setManualPatient(e.target.value)}
              style={{ padding: '12px', borderRadius: 8, border: '1px solid rgba(0,0,0,0.12)', outline: 'none', background: '#fff', color: '#111' }}
            />
            <input
              id="manualAge"
              type="number"
              placeholder="Age"
              value={manualAge}
              onChange={(e) => setManualAge(e.target.value)}
              style={{ padding: '12px', borderRadius: 8, border: '1px solid rgba(0,0,0,0.12)', outline: 'none', background: '#fff', color: '#111' }}
            />
            <input
              id="manualDate"
              placeholder="Date (DD/MM/YYYY)"
              value={manualDate}
              onChange={(e) => setManualDate(e.target.value)}
              style={{ padding: '12px', borderRadius: 8, border: '1px solid rgba(0,0,0,0.12)', outline: 'none', background: '#fff', color: '#111' }}
            />
            <textarea
              id="manualMeds"
              rows="6"
              placeholder="Medicines (one per line with time, e.g., Paracetamol 500mg 9:00 AM)"
              value={manualMeds}
              onChange={(e) => setManualMeds(e.target.value)}
              style={{ padding: '12px', borderRadius: 8, border: '1px solid rgba(0,0,0,0.12)', outline: 'none', resize: 'vertical', minHeight: 120, background: '#fff', color: '#111' }}
            />

            <button style={{ ...styles.button, width: '100%' }} onClick={handleManualSave}>
              Save Details & Set Alarms
            </button>
          </div>

          <div
            style={{ ...styles.info, minHeight: 40 }}
            dangerouslySetInnerHTML={{ __html: manualInfo }}
          />
        </div>
      </div>

      <footer style={styles.footer}>
        <div style={{maxWidth: 1100, margin: '0 auto', padding: '8px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <div>© HealTech 2025</div>
          <div style={{opacity: 0.9}}>Pharmacy • Contact: support@healtech.example</div>
        </div>
      </footer>
    </div>
  );
}

const styles = {
  page: {
    padding: "40px",
    paddingBottom: "110px",
    background: "linear-gradient(135deg, #6a11cb, #2575fc)",
    minHeight: "100vh",
    color: "#fff",
  },
  navbar: {
    width: "100%",
    background: "linear-gradient(90deg, #2563eb, #1e3a8a)",
    padding: "12px 30px",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "space-between",
  },
  logo: {
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  navLinks: {
    listStyle: "none",
    display: "flex",
    gap: "20px",
  },
  container: {
    marginTop: "60px",
    display: "flex",
    gap: "30px",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  card: {
    background: "rgba(255,255,255,0.1)",
    padding: "20px",
    borderRadius: "15px",
    backdropFilter: "blur(10px)",
    width: "420px",
  },
  preview: {
    width: "100%",
    borderRadius: "10px",
    marginTop: "10px",
  },
  info: {
    marginTop: "15px",
    padding: "15px",
    background: "rgba(0,0,0,0.3)",
    borderRadius: "10px",
  },
  button: {
    background: "#ff9800",
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    color: "#fff",
    fontWeight: "bold",
    marginTop: "10px",
    cursor: "pointer",
  },
  footer: {
    position: 'fixed',
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(90deg, rgba(0,0,0,0.15), rgba(0,0,0,0.25))',
    color: '#fff',
    borderTop: '1px solid rgba(255,255,255,0.06)',
    padding: '10px 0',
    zIndex: 50,
  },
};
