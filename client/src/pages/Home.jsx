import { useState } from "react";
import Navbar from "../components/Navbar";
import LoginModal from "../components/LoginModal";
import Footer from "../components/Footer";
import SignupModal from "../components/SignupModal";

export default function Home() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-200 via-white to-blue-200">
      
      {/* NAVBAR */}
      <Navbar openLogin={() => setLoginOpen(true)} />

      {/* HERO SECTION */}
      <section className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center px-6 py-20">

        {/* Doctor Image */}
        <img
          src="https://i.pinimg.com/736x/0e/4a/11/0e4a111c994200dc7b68d4c210fd659b.jpg"
          alt="Doctor"
          className="w-72 md:w-80 rounded-full float"
        />

        {/* Right side text */}
        <div className="text-center md:text-left mt-10 md:mt-0 md:ml-12">
          <h1 className="text-5xl font-extrabold leading-tight">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-blue-600 to-green-600 text-transparent bg-clip-text">
              HealTech
            </span>
          </h1>

          <p className="mt-4 text-gray-700 text-lg max-w-md">
            Bridging the healthcare gap in rural communities.
            <br />
            <span className="italic text-green-600">
              “Your health, our priority.”
            </span>
          </p>

          {/* Start Healing Button */}
          <button
            onClick={() => setPopupOpen(true)}
            className="mt-7 px-10 py-4 bg-gradient-to-r from-blue-600 to-green-500 text-white text-lg font-semibold rounded-full shadow-md hover:scale-105 transition-all mx-auto md:mx-0"
          >
            ✨ Start Healing ✨
          </button>
        </div>
      </section>

      {/* POPUP WHEN PRESSING START HEALING */}
      {popupOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-xl fade-in text-center w-80">
            <h3 className="text-xl font-bold text-green-700">Healing Starts Here 🌿</h3>
            <p className="mt-2 text-gray-700">
              Redirecting you to services...
            </p>

            <button
              onClick={() => {
                setPopupOpen(false);
                setLoginOpen(true);
              }}
              className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg w-full"
            >
              Continue
            </button>

            <button
              onClick={() => setPopupOpen(false)}
              className="mt-3 px-6 py-2 bg-gray-300 rounded-lg w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* LOGIN MODAL */}
     <LoginModal 
  isOpen={loginOpen} 
  close={() => setLoginOpen(false)}
  openSignup={() => {
    setLoginOpen(false);
    setSignupOpen(true);
  }}
/>

<SignupModal
  isOpen={signupOpen}
  close={() => setSignupOpen(false)}
  openLogin={() => {
    setSignupOpen(false);
    setLoginOpen(true);
  }}
/>


      {/* FOOTER */}
      <Footer />
    </div>
  );
}
