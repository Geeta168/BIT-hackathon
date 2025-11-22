import React, { useEffect, useState } from "react";

export default function DoctorDashboard() {
  const [doctor, setDoctor] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [newSlot, setNewSlot] = useState("");
  const [appointments, setAppointments] = useState({
    today: [],
    past: []
  });
  const [incomingCall, setIncomingCall] = useState(null);
  const [callActive, setCallActive] = useState(false);
  const [localStream, setLocalStream] = useState(null);
  const timersRef = React.useRef([]);

  // Fetch doctor info (simulate backend)
  useEffect(() => {
    // Try loading a saved profile from localStorage
    const saved = localStorage.getItem('doctorProfile');
    if (saved) {
      try {
        setDoctor(JSON.parse(saved));
      } catch (e) {
        console.error('Error parsing saved doctor profile', e);
      }
    } else {
      // No saved profile -> show empty form for new doctor
      setDoctor({
        name: "",
        specialist: "",
        education: "",
        experience: "",
        timings: [],
        profile: "https://cdn-icons-png.flaticon.com/512/3774/3774299.png"
      });
      setEditMode(true);
    }

    // Dummy appointments list (replace with backend fetch later)
    setAppointments({
      today: [
        { patient: "Rahul Sharma", time: "11:00 AM", issue: "Chest Pain" },
        { patient: "Ananya Rao", time: "6:30 PM", issue: "BP Check" }
      ],
      past: [
        { patient: "Suresh Kumar", time: "Yesterday", issue: "Heart Checkup" },
        { patient: "Priya Patel", time: "2 days ago", issue: "ECG Review" }
      ]
    });
  }, []);

  // When appointments change, schedule timers for today's appointments
  useEffect(() => {
    // clear any existing timers
    timersRef.current.forEach((id) => clearTimeout(id));
    timersRef.current = [];

    if (!appointments || !appointments.today) return;

    appointments.today.forEach((a) => {
      const alarmDate = parseTimeToToday(a.time);
      if (!alarmDate) return;

      const now = new Date();
      let diff = alarmDate - now;
      if (diff < 0) {
        // if time already passed today, skip or schedule for tomorrow
        return;
      }

      const id = setTimeout(() => {
        // trigger incoming call
        triggerIncomingCall(a);
      }, diff);

      timersRef.current.push(id);
    });

    return () => {
      timersRef.current.forEach((id) => clearTimeout(id));
      timersRef.current = [];
    };
  }, [appointments]);

  // Cleanup media on unmount
  useEffect(() => {
    return () => {
      stopLocalStream();
      timersRef.current.forEach((id) => clearTimeout(id));
    };
  }, []);

  // Helper: parse strings like "11:00 AM" or "6:30 PM" to a Date for today
  const parseTimeToToday = (timeStr) => {
    if (!timeStr) return null;
    const m = timeStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
    if (!m) return null;
    let hour = parseInt(m[1], 10);
    const minute = parseInt(m[2], 10);
    const ampm = m[3].toUpperCase();
    if (ampm === "PM" && hour !== 12) hour += 12;
    if (ampm === "AM" && hour === 12) hour = 0;

    const d = new Date();
    d.setHours(hour, minute, 0, 0);
    return d;
  };

  const ringtone = new Audio("https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg");

  const triggerIncomingCall = (appointment) => {
    // show modal and play ringtone
    setIncomingCall(appointment);
    try { ringtone.loop = true; ringtone.play(); } catch (e) { /* ignore autoplay issues */ }
    if (Notification.permission === "granted") {
      new Notification("Incoming video call", { body: `${appointment.patient} is calling for ${appointment.issue}` });
    }
  };

  const acceptCall = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setLocalStream(stream);
      setCallActive(true);
      setIncomingCall(null);
      try { ringtone.pause(); ringtone.currentTime = 0; } catch (e) {}
    } catch (err) {
      alert("Unable to access camera/microphone: " + (err.message || err));
    }
  };

  // Attach local stream to video element when available
  useEffect(() => {
    const v = document.getElementById('localVideo');
    if (v && localStream) {
      v.srcObject = localStream;
    }
    return () => {
      if (v) v.srcObject = null;
    };
  }, [localStream]);

  const declineCall = () => {
    setIncomingCall(null);
    try { ringtone.pause(); ringtone.currentTime = 0; } catch (e) {}
  };

  const stopLocalStream = () => {
    if (localStream) {
      localStream.getTracks().forEach(t => t.stop());
      setLocalStream(null);
    }
    setCallActive(false);
  };

  // Handle profile image file upload
  const handleProfileFile = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setDoctor({ ...doctor, profile: ev.target.result });
    };
    reader.readAsDataURL(file);
  };

  const removeProfileImage = () => {
    setDoctor({ ...doctor, profile: "" });
  };

  if (!doctor) return <h2 style={{ textAlign: "center", marginTop: 50 }}>Loading...</h2>;

  // Handle free timing slot add
  const addSlot = () => {
    if (!newSlot.trim()) return alert("Enter a time slot!");
    const updated = { ...doctor, timings: [...(doctor.timings || []), newSlot] };
    setDoctor(updated);
    try { localStorage.setItem('doctorProfile', JSON.stringify(updated)); } catch (e) { console.error('Failed saving timings', e); }
    setNewSlot("");
  };

  // Handle editing info
  const saveChanges = () => {
    try {
      localStorage.setItem('doctorProfile', JSON.stringify(doctor));
    } catch (e) {
      console.error('Failed to save doctor profile', e);
    }
    setEditMode(false);
    alert("Doctor profile updated successfully!");
  };

  return (
    <div style={styles.page}>

      {/* NAVBAR */}
      <nav style={styles.nav}>
        <h1 style={styles.logo}>HealTech</h1>
        <ul style={styles.links}>
          <li><a href="/doctor">Dashboard</a></li>
          <li><a href="/consultations">Consultations</a></li>
          <li><a href="/patients">Patients</a></li>
          <li><button onClick={() => { try { localStorage.removeItem('isLoggedIn'); } catch(e){}; window.location.href = '/'; }} style={{background:'transparent', border:'none', cursor:'pointer', color:'#1e3a8a'}}>Logout</button></li>
        </ul>
      </nav>

      <h1 style={styles.title}>👨‍⚕️ Doctor Profile</h1>

      {/* Doctor Profile Card */}
      <div style={styles.card}>
        <img src={doctor.profile || 'https://via.placeholder.com/120?text=Dr'} alt="doctor" style={styles.avatar} />

        {editMode ? (
          <>
            <input
              style={styles.input}
              value={doctor.profile}
              onChange={(e) => setDoctor({ ...doctor, profile: e.target.value })}
              placeholder="Profile image URL (optional)"
              aria-label="Profile image URL"
            />

            <div style={{display:'flex', gap:10, alignItems:'center', marginTop:8}}>
              <label style={{cursor:'pointer', background:'#eef2ff', padding:'8px 10px', borderRadius:8}}>
                Upload Image
                <input type="file" accept="image/*" onChange={handleProfileFile} style={{display:'none'}} />
              </label>
              <button onClick={removeProfileImage} style={{background:'#f97373', color:'#fff', border:'none', padding:'8px 10px', borderRadius:8, cursor:'pointer'}}>Remove Image</button>
            </div>
            <input
              style={styles.input}
              value={doctor.name}
              onChange={(e) => setDoctor({ ...doctor, name: e.target.value })}
              placeholder="Full name — e.g., Dr. Arjun Mehta"
              aria-label="Doctor full name"
            />
            <input
              style={styles.input}
              value={doctor.specialist}
              onChange={(e) => setDoctor({ ...doctor, specialist: e.target.value })}
              placeholder="Specialization — e.g., Cardiologist"
              aria-label="Specialization"
            />
            <input
              style={styles.input}
              value={doctor.education}
              onChange={(e) => setDoctor({ ...doctor, education: e.target.value })}
              placeholder="Education — e.g., MBBS, MD Cardiology"
              aria-label="Education"
            />
            <input
              style={styles.input}
              value={doctor.experience}
              onChange={(e) => setDoctor({ ...doctor, experience: e.target.value })}
              placeholder="Experience — e.g., 8 years"
              aria-label="Experience"
            />

            <button style={styles.saveBtn} onClick={saveChanges}>
              Save Changes
            </button>
          </>
        ) : (
          <>
            <h2 style={styles.name}>{doctor.name}</h2>
            <p style={styles.field}><strong>Specialist:</strong> {doctor.specialist}</p>
            <p style={styles.field}><strong>Education:</strong> {doctor.education}</p>
            <p style={styles.field}><strong>Experience:</strong> {doctor.experience}</p>

            <button style={styles.editBtn} onClick={() => setEditMode(true)}>
              Edit Profile
            </button>
          </>
        )}
      </div>

      {/* Manage Free Slots */}
      <h2 style={styles.subTitle}>⏰ Manage Availability</h2>
      <div style={styles.slotBox}>
        <h3>Available Slots</h3>
        <ul>
          {doctor.timings.map((slot, i) => (
            <li key={i}>{slot}</li>
          ))}
        </ul>

        <div style={styles.slotInputBox}>
          <input
            style={styles.input}
            placeholder="Add new slot (e.g., 3:00 PM - 4:00 PM)"
            value={newSlot}
            onChange={(e) => setNewSlot(e.target.value)}
          />
          <button style={styles.addBtn} onClick={addSlot}>Add Slot</button>
        </div>
      </div>

      {/* Appointment Sections */}
      <h2 style={styles.subTitle}>📅 Today’s Appointments</h2>
      {appointments.today.map((a, i) => (
        <div key={i} style={styles.appointmentCard}>
          <p><strong>{a.patient}</strong></p>
          <p>Time: {a.time}</p>
          <p>Issue: {a.issue}</p>
        </div>
      ))}

      {/* Incoming Call Modal */}
      {incomingCall && (
        <div style={styles.callOverlay}>
          <div style={styles.callModal}>
            <h3>Incoming Video Call</h3>
            <p><strong>{incomingCall.patient}</strong> is calling for <em>{incomingCall.issue}</em></p>
            <div style={{marginTop:12, display:'flex', gap:10, justifyContent:'center'}}>
              <button style={{...styles.acceptBtn}} onClick={acceptCall}>Accept</button>
              <button style={{...styles.declineBtn}} onClick={declineCall}>Decline</button>
            </div>
          </div>
        </div>
      )}

      {/* Active Call UI (local preview) */}
      {callActive && (
        <div style={styles.callArea}>
          <h3>In Call with patient</h3>
          <video id="localVideo" autoPlay playsInline muted style={styles.localVideo} />
          <div style={{marginTop:10}}>
            <button style={styles.endBtn} onClick={stopLocalStream}>End Call</button>
          </div>
        </div>
      )}

      <h2 style={styles.subTitle}>📜 Past Appointments</h2>
      {appointments.past.map((a, i) => (
        <div key={i} style={styles.appointmentCard}>
          <p><strong>{a.patient}</strong></p>
          <p>{a.time}</p>
          <p>Issue: {a.issue}</p>
        </div>
      ))}

    </div>
  );
}

// STYLES
const styles = {
  page: {
    fontFamily: "Poppins",
    background: "linear-gradient(135deg, #93c5fd, #ffffff)",
    paddingBottom: "40px",
    minHeight: "100vh"
  },
  nav: {
    width: "100%",
    padding: "15px 40px",
    background: "#fff",
    display: "flex",
    justifyContent: "space-between",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
  },
  logo: {
    fontSize: "28px",
    fontWeight: "bold",
    background: "linear-gradient(90deg,#2563eb,#16a34a,#f59e0b)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent"
  },
  links: { display: "flex", gap: 20 },
  title: { textAlign: "center", fontSize: 36, marginTop: 20, color: "#1e3a8a" },

  card: {
    background: "#fff",
    width: "90%",
    maxWidth: 450,
    margin: "20px auto",
    padding: 25,
    borderRadius: 20,
    textAlign: "center",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)"
  },
  avatar: { width: 120, height: 120, borderRadius: "50%" },
  name: { fontSize: 24, marginTop: 10, color: "#2563eb" },
  field: { fontSize: 16, marginTop: 5 },

  input: {
    padding: 10,
    borderRadius: 12,
    width: "100%",
    marginTop: 10,
    border: "2px solid #2563eb"
  },
  smallMuted: { fontSize: 12, color: '#475569', marginTop: 6 },
  editBtn: {
    marginTop: 15,
    padding: "10px 20px",
    borderRadius: 12,
    background: "#2563eb",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontWeight: 600
  },
  saveBtn: {
    marginTop: 15,
    padding: "10px 20px",
    borderRadius: 12,
    background: "#16a34a",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontWeight: 600
  },

  subTitle: {
    fontSize: 26,
    width: "90%",
    margin: "20px auto",
    color: "#1e40af"
  },

  slotBox: {
    background: "#fff",
    width: "90%",
    margin: "auto",
    borderRadius: 20,
    padding: 20,
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
  },
  slotInputBox: { marginTop: 10 },
  addBtn: {
    background: "#10b981",
    padding: "10px 20px",
    color: "#fff",
    marginTop: 10,
    borderRadius: 12,
    border: "none",
    cursor: "pointer"
  },

  appointmentCard: {
    background: "#fff",
    width: "90%",
    margin: "10px auto",
    padding: 15,
    borderRadius: 12,
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
  }
  ,
  callOverlay: {
    position: 'fixed',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(0,0,0,0.45)',
    zIndex: 9999
  },
  callModal: {
    background: '#fff',
    color: '#111',
    padding: 20,
    borderRadius: 12,
    textAlign: 'center',
    width: 320,
    boxShadow: '0 10px 30px rgba(0,0,0,0.25)'
  },
  acceptBtn: {
    background: '#10b981',
    color: '#fff',
    padding: '10px 16px',
    borderRadius: 8,
    border: 'none',
    cursor: 'pointer'
  },
  declineBtn: {
    background: '#ef4444',
    color: '#fff',
    padding: '10px 16px',
    borderRadius: 8,
    border: 'none',
    cursor: 'pointer'
  },
  callArea: {
    position: 'fixed',
    right: 20,
    bottom: 120,
    width: 360,
    background: '#fff',
    padding: 12,
    borderRadius: 12,
    boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
    zIndex: 9998,
    textAlign: 'center'
  },
  localVideo: { width: '100%', borderRadius: 8, background: '#000' },
  endBtn: { marginTop: 8, background: '#ef4444', color: '#fff', padding: '8px 12px', border: 'none', borderRadius: 8 }
};
