export default function Hero({ openLogin }) {
  return (
    <section className="flex flex-col md:flex-row items-center gap-10 px-8 py-16">

      {/* Doctor Image */}
      <img
        src="https://i.pinimg.com/736x/0e/4a/11/0e4a111c994200dc7b68d4c210fd659b.jpg"
        className="w-64 rounded-full animate-bounce"
      />

      {/* Text Section */}
      <div>
        <h2 className="text-5xl font-extrabold text-blue-700">
          Welcome to{" "}
          <span className="bg-gradient-to-r from-blue-600 to-green-600 text-transparent bg-clip-text">
            HealTech
          </span>
        </h2>

        <p className="mt-4 text-lg text-gray-700">
          Bridging the healthcare gap in rural communities.
          <br />
          <span className="italic text-green-600">
            “Your health, our priority.”
          </span>
        </p>

        {/* Start Healing opens LOGIN modal */}
        <button
          onClick={openLogin}
          className="mt-6 px-8 py-4 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-full text-xl font-bold shadow-lg hover:scale-105 transition"
        >
          ✨ Start Healing ✨
        </button>
      </div>
    </section>
  );
}
