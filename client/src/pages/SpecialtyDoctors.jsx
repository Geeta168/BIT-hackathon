import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from 'react-router-dom'

export default function SpecialtyDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState(() => JSON.parse(localStorage.getItem('bookings') || '[]'));
  const [bookingModal, setBookingModal] = useState({ open: false, doctor: null, slot: null });
  const [patientName, setPatientName] = useState('');
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // prefer route param, fallback to query param
  let specialization = params.name ? decodeURIComponent(params.name) : null;
  if (!specialization) {
    const q = new URLSearchParams(location.search);
    specialization = q.get('name');
  }

  // TEMP FAKE DATA (will connect to backend later)
  const localDoctors = JSON.parse(localStorage.getItem("allDoctors")) || [];

  // sample doctor used for quick preview
  const sampleDoctor = {
    name: "Dr. Arjun Mehta",
    specialist: specialization || "Cardiology",
    education: "MBBS, MD Cardiology",
    experience: "8 years",
    timings: ["10:00 AM - 11:00 AM", "2:00 PM - 3:00 PM"],
    profile: "https://cdn-icons-png.flaticon.com/512/709/709496.png"
  };

  useEffect(() => {
    // filter doctors stored from the Doctor Dashboard
    const filtered = localDoctors.filter(
      (doc) => doc.specialist === specialization
    );

    setDoctors(filtered);
    setLoading(false);
  }, [specialization]);

  // helper to persist bookings
  const saveBookings = (next) => {
    setBookings(next);
    try { localStorage.setItem('bookings', JSON.stringify(next)); } catch (e) { console.error('failed to save bookings', e); }
  };

  const confirmBooking = () => {
    if (!bookingModal.doctor || !bookingModal.slot) return;
    const b = {
      doctorName: bookingModal.doctor.name,
      specialist: bookingModal.doctor.specialist,
      slot: bookingModal.slot,
      patientName: patientName || 'Anonymous',
      bookedAt: new Date().toISOString()
    };

    const next = [...bookings, b];
    saveBookings(next);

    // also update persisted allDoctors timings if present
    try {
      const all = JSON.parse(localStorage.getItem('allDoctors') || '[]');
      const idx = all.findIndex(d => d.name === bookingModal.doctor.name && d.specialist === bookingModal.doctor.specialist);
      if (idx !== -1) {
        all[idx].timings = (all[idx].timings || []).filter(s => s !== bookingModal.slot);
        localStorage.setItem('allDoctors', JSON.stringify(all));
      }
    } catch (e) { /* ignore */ }

    // update current UI list by removing the booked slot
    setDoctors(prev => prev.map(doc => {
      if (doc.name === bookingModal.doctor.name && doc.specialist === bookingModal.doctor.specialist) {
        return { ...doc, timings: (doc.timings || []).filter(s => s !== bookingModal.slot) };
      }
      return doc;
    }));

    setBookingModal({ open: false, doctor: null, slot: null });
    setPatientName('');
    alert(`Booked ${bookingModal.slot} with ${b.doctorName} for ${b.patientName}`);
  };

  const cancelBooking = () => {
    setBookingModal({ open: false, doctor: null, slot: null });
    setPatientName('');
  };

  if (loading)
    return <h2 className="text-center mt-10 text-xl">Loading doctors...</h2>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white p-6">
      {/* HEADER */}
      <header className="flex justify-between px-4 mb-6">
        <button
          onClick={() => navigate('/consultation')}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          ← Back
        </button>

        <h1 className="text-3xl font-bold text-blue-800">
          Doctors - {specialization}
        </h1>

        <div></div>
      </header>

      {doctors.length === 0 ? (
        <div className="text-center mt-10">
          <p className="text-gray-700 text-lg">No doctors available for this specialization yet.</p>
          <div className="mt-4">
            <button
              onClick={() => { setDoctors([sampleDoctor]); setLoading(false); }}
              className="px-4 py-2 bg-green-500 text-white rounded-lg"
            >
              Show Sample Doctor
            </button>
            <button
              onClick={() => { localStorage.setItem('allDoctors', JSON.stringify([sampleDoctor])); setDoctors([sampleDoctor]); setLoading(false); }}
              className="ml-3 px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Seed & View
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {doctors.map((doc, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition"
            >
              <div className="flex gap-4 items-center">
                <img
                  src={
                    doc.profile ||
                    "https://via.placeholder.com/80?text=Dr"
                  }
                  className="w-20 h-20 rounded-full border"
                  alt="doctor"
                />

                <div>
                  <h2 className="text-xl font-bold text-blue-700">
                    {doc.name}
                  </h2>
                  <p className="text-gray-600">{doc.education}</p>
                  <p className="text-gray-600">{doc.experience}</p>
                </div>
              </div>

              {/* Slots */}
              <div className="mt-4">
                <h3 className="font-semibold text-blue-800 mb-2">
                  Available Slots:
                </h3>

                <div className="flex gap-2 flex-wrap">
                  {doc.timings.length === 0 ? (
                    <p className="text-gray-500">No free slots yet.</p>
                  ) : (
                    doc.timings.map((slot, i) => {
                      const isBooked = bookings.some(b => b.doctorName === doc.name && b.slot === slot);
                      return (
                        <button
                          key={i}
                          onClick={() => {
                            if (isBooked) return alert('This slot is already booked.');
                            setBookingModal({ open: true, doctor: doc, slot });
                          }}
                          disabled={isBooked}
                          className={`px-3 py-1 rounded-lg border transition ${isBooked ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-green-100 text-green-800 hover:bg-green-300'}`}
                        >
                          {isBooked ? `${slot} (Booked)` : slot}
                        </button>
                      )
                    })
                  )}
                </div>
              </div>

              <button
                onClick={() =>
                  alert(`Viewing full profile of ${doc.name}`)
                }
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                View Profile
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Booking Modal */}
      {bookingModal.open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[90%] max-w-md">
            <h3 className="text-lg font-bold">Confirm Booking</h3>
            <p className="mt-2">Doctor: <strong>{bookingModal.doctor?.name}</strong></p>
            <p>Specialty: {bookingModal.doctor?.specialist}</p>
            <p>Slot: <strong>{bookingModal.slot}</strong></p>

            <div className="mt-4">
              <label className="block text-sm text-gray-600">Your name</label>
              <input value={patientName} onChange={(e) => setPatientName(e.target.value)} className="mt-1 w-full border rounded-md px-3 py-2" placeholder="Enter patient name" />
            </div>

            <div className="mt-4 flex justify-end gap-3">
              <button onClick={cancelBooking} className="px-4 py-2 rounded-lg bg-gray-200">Cancel</button>
              <button onClick={confirmBooking} className="px-4 py-2 rounded-lg bg-green-600 text-white">Confirm Booking</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
