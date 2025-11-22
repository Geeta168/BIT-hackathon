import React from "react";

/* placeholder doctors same as your HTML */
const doctors = {
  video: [
    { name: "Dr. Aisha Khan", specialization: "Cardiologist", location: "Delhi", available: true },
    { name: "Dr. Meera Singh", specialization: "Neurologist", location: "Bengaluru", available: true },
    { name: "Dr. Rajesh Verma", specialization: "Pediatrician", location: "Mumbai", available: true }
  ],
  audio: [
    { name: "Dr. Sunita Sharma", specialization: "General Physician", location: "Hyderabad", available: true },
    { name: "Dr. Karan Verma", specialization: "ENT", location: "Jaipur", available: true },
    { name: "Dr. Aman Gill", specialization: "Dermatologist", location: "Chennai", available: true }
  ]
};

export default function DoctorList({ visible, type, onCall }) {
  if (!visible) return null;
  const list = doctors[type] || [];

  return (
    <div id="doctor-list">
      <div className="available-heading">Available at the moment:</div>
      {list.filter(d => d.available).map((doc, i) => (
        <div key={i} className="item show">
          <div style={{display:"flex", alignItems:"center", gap:"15px"}}>
            <img
              className="placeholder-img"
              src="/https://imgs.search.brave.com/LiPtRzE7Q_3r4j7-m1j_kzS8QgWsRsFOjR9YkvHuKi4/rs:fit:0:180:1:0/g:ce/aHR0cHM6Ly9jZG4u/aWNvbnNjb3V0LmNv/bS9pY29uL2ZyZWUv/cG5nLTI1Ni9mcmVl/LWVtZXJnZW5jeS1j/YWxsLWljb24tZG93/bmxvYWQtaW4tc3Zn/LXBuZy1naWYtZmls/ZS1mb3JtYXRzLS1s/b2dvLWhvc3BpdGFs/LWRvY3Rvci1jb3Jv/bmF2aXJ1cy1jb3Zp/ZDE5LXBhY2staGVh/bHRoY2FyZS1tZWRp/Y2FsLWljb25zLTE4/MzMzODUucG5nP2Y9/d2VicCZ3PTEyOA"
              alt="doctor"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120"><circle cx="60" cy="60" r="58" fill="%23d1d5db" stroke="%232563eb" stroke-width="3"/><text x="60" y="72" font-size="18" font-family="Segoe UI, sans-serif" text-anchor="middle" fill="%23000">doc</text></svg>';
              }}
            />
            <div>
              <strong>{doc.name}</strong><br/>
              Specialization: {doc.specialization}<br/>
              Location: {doc.location}<br/>
              <button
                style={{marginTop:6, padding:"6px 12px", border:"none", borderRadius:10, background:"#34d399", color:"white", cursor:"pointer"}}
                onClick={() => onCall(doc.name, type)}
              >
                📞 Call Now
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
