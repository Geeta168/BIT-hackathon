import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import Navbar from "../components/Navbar";
import LoginModal from "../components/LoginModal";
import Footer from "../components/Footer";
import SignupModal from "../components/SignupModal";

export default function Home() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [postLoginRedirect, setPostLoginRedirect] = useState(null);
  const navigate = useNavigate();

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
          className="w-72 md:w-80 rounded-full"
        />

        {/* Right side text */}
        <div className="text-center md:text-left mt-10 md:mt-0 md:ml-6">
          <h1 className="text-5xl font-extrabold leading-tight">
            <span className="bg-gradient-to-r from-blue-700 via-green-500 to-yellow-400 text-transparent bg-clip-text">
              Welcome to HealTech
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
              onClick={() => setLoginOpen(true)}
            className="mt-7 px-10 py-4 bg-gradient-to-r from-blue-600 to-green-500 text-white text-lg font-semibold rounded-full shadow-md hover:scale-105 transition-all mx-auto md:mx-0"
          >
            ✨ Start Healing ✨
          </button>
        </div>
      </section>

      {/* POPUP WHEN PRESSING START HEALING */}
        {popupOpen && (
        <div className="modal-overlay">
          <div className="modal-content fade-in text-center">
                <h3 className="text-xl font-bold text-green-700">Select Your Role</h3>
                <p className="mt-2 text-gray-700">Choose how you'd like to continue</p>

                <div className="mt-6 flex flex-col gap-3">
                  <button
                    className="px-4 py-3 bg-green-300 rounded-lg font-semibold"
                    onClick={() => {
                      try { localStorage.setItem('userRole', 'patient'); } catch (e) {}
                      setPopupOpen(false);
                      navigate('/patient');
                    }}
                  >
                    Patient
                  </button>
                  <button
                    className="px-4 py-3 bg-blue-400 rounded-lg font-semibold"
                    onClick={() => {
                      try { localStorage.setItem('userRole', 'doctor'); } catch (e) {}
                      setPopupOpen(false);
                      navigate('/doctor');
                    }}
                  >
                    Doctor
                  </button>
                  <button className="px-4 py-3 bg-red-300 rounded-lg font-semibold" onClick={() => { setPopupOpen(false); navigate('/emergency'); }}>
                    🚨 Emergency ?
                  </button>
                </div>

                <button
                  onClick={() => setPopupOpen(false)}
                  className="mt-4 px-6 py-2 bg-gray-300 rounded-lg w-full"
                >
                  Close
                </button>
              </div>
        </div>
      )}

      {/* LOGIN MODAL */}
     <LoginModal 
        isOpen={loginOpen} 
        close={() => { setLoginOpen(false); setPostLoginRedirect(null); }}
        openSignup={() => {
          setLoginOpen(false);
          setSignupOpen(true);
        }}
          onLoginSuccess={() => setPopupOpen(true)}
        postLoginRedirect={postLoginRedirect}
        demo={true}
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
