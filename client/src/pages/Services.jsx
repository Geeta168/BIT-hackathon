export default function Services() {
  return (
    <div className="min-h-screen bg-green-50">
      {/* HEADER */}
      <header className="bg-green-600 text-white py-6 text-center">
        <h1 className="text-3xl font-bold">Our Services</h1>
      </header>

      {/* CONTENT */}
      <section className="max-w-4xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold text-green-800">We Offer</h2>

        <ul className="mt-4 space-y-3">
          <li className="bg-green-100 p-4 rounded-xl text-gray-700">
            📞 Video/Audio Consultation
          </li>
          <li className="bg-green-100 p-4 rounded-xl text-gray-700">
            🌍 Multilingual Availability (English, Punjabi, Hindi)
          </li>
          <li className="bg-green-100 p-4 rounded-xl text-gray-700">
            💊 Pharmacy Stock Tracking System
          </li>
          <li className="bg-green-100 p-4 rounded-xl text-gray-700">
            🤖 AI Symptom Checker / AI Chatbot
          </li>
          <li className="bg-green-100 p-4 rounded-xl text-gray-700">
            ⏰ From Prescription to Reminders – Never Miss a Dose
          </li>
          <li className="bg-green-100 p-4 rounded-xl text-gray-700">
            📂 Digital Health Records
          </li>
          <li className="bg-green-100 p-4 rounded-xl text-gray-700">
            👨‍⚕ Doctor Pool Scheduler
          </li>
          <li className="bg-green-100 p-4 rounded-xl text-gray-700">
            🚨 Emergency Alert App with Location Sharing
          </li>
          <li className="bg-green-100 p-4 rounded-xl text-gray-700">
            🆔 Digital Health Card (QR-based)
          </li>
        </ul>

        <a
          href="/"
          className="inline-block mt-10 text-blue-600 hover:underline font-semibold"
        >
          ⬅ Back to Home
        </a>
      </section>
    </div>
  );
}
