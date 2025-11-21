<<<<<<< HEAD
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginModal({ isOpen, close, openSignup, postLoginRedirect, onLoginSuccess }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

=======
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";



export default function LoginModal({ isOpen, close, openSignup }) {
>>>>>>> 35e4b12556fd10dd4d81249a8cb4bcf6d773172e
    if (!isOpen) return null;
    const navigate=useNavigate();

      const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleLogin = async()=>{
        const res=await fetch("http://localhost:4000/login",{
            method:"POST",
            headers:{"Content-type":"application/json"},
            body: JSON.stringify({email,password})
        });
     
        const data=await res.json();
        console.log(data);

         if (data.message === "login successful") {     
        return navigate("/dashboard");    
    } else {
        alert(data.message); 
    }
    }


  const handleSignup =  async () => {
    const res = await fetch("http://localhost:4000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" }, //“I’m sending JSON data.”
        body: JSON.stringify({ email, password })  //This is the actual data sent to the server,
    });

    const data = await res.json();
    console.log(data);

    if (data.message === "Signup successful") {
        navigate("/dashboard");    
    } else {
        alert(data.error); 
    }
};

  


    const handleSubmit = async (e) => {
        e.preventDefault();

            setLoading(true);
            try {
                const res = await fetch('http://localhost:4000/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });

                if (1) {
                                        // successful login -> mark logged in and then show role selection (or navigate)
                                        try { localStorage.setItem('isLoggedIn', 'true'); } catch (e) {}
                                        close();
                                        if (typeof onLoginSuccess === 'function') {
                                                try { onLoginSuccess(); } catch (e) { console.error(e); }
                                        } else {
                                                const dest = postLoginRedirect || '/patient';
                                                navigate(dest);
                                        }
                } else {
                    // parse error message if present
                    let msg = 'Login failed';
                    try {
                        const j = await res.json();
                        msg = j.message || msg;
                    } catch (_) {}
                    alert(msg);
                }
            } catch (err) {
                console.error('Login request error:', err);
                alert('Network error while logging in');
            } finally {
                setLoading(false);
            }
    }

    return (
<<<<<<< HEAD
            <div className="modal-overlay">
                <div className="modal-content fade-in">
=======
      <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
            <div className="bg-white w-96 p-8 rounded-3xl shadow-2xl fade-in">
>>>>>>> 35e4b12556fd10dd4d81249a8cb4bcf6d773172e

                Heading
                <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
                    {isLogin ? "Login" : "Signup"}
                </h2>

<<<<<<< HEAD
                <form onSubmit={handleSubmit}>
                    {/* Email */}
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="Email"
                        className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />

                    {/* Password */}
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="Password"
                        className="w-full p-3 mb-5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />

                    {/* Login Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                {/* Signup Link */}
                <div className="mt-3 text-center">
                    <span
                        className="text-blue-600 font-medium cursor-pointer hover:underline"
                        onClick={() => {
                            close();
                            openSignup();
                        }}
                    >
                        Create account
                    </span>
                </div>
=======
                Email
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {/* Password */}
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {/* Confirm Password (only for signup) */}
                {!isLogin && (
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                )}

                {/* Login/Signup Button */}
                <button
                    onClick={isLogin ? handleLogin : handleSignup}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition mb-4"
                >
                    {isLogin ? "Login" : "Signup"}
                </button>

                {/* Toggle Link */}
                <span
                    className="text-blue-600 font-medium cursor-pointer hover:underline block text-center"
                    onClick={() => setIsLogin(!isLogin)}
                >
                    {isLogin
                        ? "Create account"
                        : "Already have an account? Login"}
                </span>
>>>>>>> 35e4b12556fd10dd4d81249a8cb4bcf6d773172e

                {/* Close Button */}
                    <button
                        onClick={close}
                        className="w-full mt-5 bg-gray-200 py-3 rounded-lg font-medium hover:bg-gray-300 transition"
                    >
                        Close
                    </button>

            </div>
        </div>
    );
}
