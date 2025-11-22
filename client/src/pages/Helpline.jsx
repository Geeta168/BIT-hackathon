export default function Helpline() {
  return (
    <div className="min-h-screen bg-blue-50">
      {/* HEADER */}
      <header className="bg-blue-600 text-white py-6 text-center">
        <h1 className="text-3xl font-bold">Helpline & Emergency Support</h1>
      </header>

      {/* CONTENT */}
      <section className="max-w-3xl mx-auto px-6 py-10">

        {/* Emergency Contact */}
        <h2 className="text-2xl font-bold text-blue-700">Emergency Contact</h2>

        <div className="bg-blue-100 p-4 rounded-xl mt-3">
          <p className="text-lg">
            📞 24/7 Medical Helpline: <strong>1800-123-456</strong>
          </p>
          <p className="text-lg mt-2">
            📱 WhatsApp Support: <strong>+91-9876543210</strong>
          </p>
        </div>

        {/* Services */}
        <h2 className="text-2xl font-bold text-blue-700 mt-10">Available Services</h2>
        <p className="mt-3 text-gray-700">
          Our helpline connects you instantly with:
        </p>

        <ul className="list-disc list-inside text-gray-700 space-y-2 mt-3">
          <li>👨‍⚕ On-call Doctors</li>
          <li>🚑 Ambulance & Emergency Alert (with location sharing)</li>
          <li>🧑‍🤝‍🧑 Counseling Support</li>
          <li>🌐 Multilingual Support</li>
        </ul>

        {/* Back to home */}
        <a
          href="/"
          className="inline-block mt-10 text-blue-600 font-semibold hover:underline"
        >
          ⬅ Back to Home
        </a>
      </section>
    </div>
  );
}
