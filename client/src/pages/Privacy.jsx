export default function Privacy() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <header className="bg-purple-600 text-white py-6 text-center">
        <h1 className="text-3xl font-bold">Privacy Policy</h1>
      </header>

      {/* CONTENT */}
      <section className="max-w-3xl mx-auto px-6 py-10">

        {/* Section 1 */}
        <h2 className="text-2xl font-bold text-purple-700">
          Your Privacy Matters
        </h2>
        <p className="mt-3 text-gray-700 leading-relaxed">
          At HealTech, we take your privacy seriously. Our policies are designed
          to protect your health records and personal data.
        </p>

        {/* Section 2 */}
        <h2 className="text-2xl font-bold text-purple-700 mt-10">
          Key Highlights
        </h2>

        <ul className="list-disc ml-5 mt-3 text-gray-700 space-y-2">
          <li>🔒 All consultations are encrypted end-to-end.</li>
          <li>👤 We never share your personal health data without consent.</li>
          <li>🗂 You can request access or deletion of your health records anytime.</li>
          <li>📜 We comply with government and healthcare privacy regulations.</li>
        </ul>

        {/* Back link */}
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
