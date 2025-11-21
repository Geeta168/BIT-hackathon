import { Link, useNavigate } from 'react-router-dom'

export default function PatientPortal() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 font-['Roboto']">

      {/* NAVBAR */}
      <nav className="w-full bg-gradient-to-r from-blue-600 to-blue-900 text-white flex justify-between items-center px-6 py-4 sticky top-0 shadow-lg z-50">
        <div className="text-2xl font-bold">HealTech</div>

        <ul className="flex gap-6 font-semibold">
          <li><Link to="/" className="hover:text-yellow-300">🏠 Home</Link></li>
          <li><Link to="/patient" className="hover:text-yellow-300">👩‍⚕️ Dashboard</Link></li>
          <li><Link to="/consultation" className="hover:text-yellow-300">💬 Consultation</Link></li>
          <li><Link to="/prescription" className="hover:text-yellow-300">📄 Prescriptions</Link></li>
        </ul>
      </nav>

      {/* TITLE */}
      <h1 className="text-center text-3xl font-bold text-blue-800 mt-10">
        👩‍⚕️ Patient Dashboard
      </h1>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mx-auto mt-10">

        {/* 1. Symptoms Checker */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:scale-[1.02] transition">
          <img
            src="https://miro.medium.com/v2/resize:fit:1400/1*qpB8ca3MApdeLiwoBpkUxQ.jpeg"
            className="w-full h-40 object-cover"
            alt="Symptoms Checker"
          />

          <div className="p-5 text-center flex flex-col justify-between">
            <h2 className="text-xl font-bold text-gray-800">🩺 Symptoms Checker</h2>
            <button
              onClick={() => navigate('/symptom-checker')}
              className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-800"
            >
              Start
            </button>
          </div>
        </div>

        {/* 2. Consultation */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:scale-[1.02] transition">
          <img
            src="https://goqii.com/blog/wp-content/uploads/Doctor-Consultation.jpg"
            className="w-full h-40 object-cover"
            alt="Consultation"
          />

          <div className="p-5 text-center">
            <h2 className="text-xl font-bold text-gray-800">💬 Need Consultation?</h2>

            <div className="mt-3 flex justify-center gap-3">
              <button
                onClick={() => navigate('/consultation')}
                className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-800"
              >
                Yes
              </button>

              <button
                onClick={() => navigate('/patient')}
                className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-800"
              >
                No
              </button>
            </div>
          </div>
        </div>

        {/* 3. Prescriptions */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:scale-[1.02] transition">
          <img
            src="https://thumbs.dreamstime.com/b/close-up-image-professional-doctor-explaining-consulting-treatment-plan-surgery-old-lady-290996370.jpg"
            className="w-full h-40 object-cover"
            alt="Prescriptions"
          />

          <div className="p-5 text-center">
            <h2 className="text-xl font-bold text-gray-800">📄 Prescriptions Careline</h2>
            <button
              onClick={() => navigate('/prescription')}
              className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-800"
            >
              View
            </button>
          </div>
        </div>

        {/* 4. Pharmacy Stock */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:scale-[1.02] transition">
          <img
            src="https://www.datarithm.co/hubfs/M_perpet-inventory.jpg"
            className="w-full h-40 object-cover"
            alt="Pharmacy Stock"
          />

          <div className="p-5 text-center">
            <h2 className="text-xl font-bold text-gray-800">💊 Find Pharmacy Stock</h2>

            <div className="mt-3 flex justify-center gap-3">
              <button
                onClick={() => navigate('/pharmacy')}
                className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-800"
              >
                Yes
              </button>

              <button
                onClick={() => alert('No need now')}
                className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-800"
              >
                No
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
