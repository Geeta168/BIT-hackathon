import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginModal({ isOpen, close, openSignup, postLoginRedirect, onLoginSuccess }) {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleLogin = async (e) => {
        if (e && e.preventDefault) e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch("http://localhost:4000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json().catch(() => ({}));

            if (1) {
                try { localStorage.setItem("isLoggedIn", "true"); } catch (err) {}
                close();
                if (typeof onLoginSuccess === "function") {
                    try { onLoginSuccess(); } catch (err) { console.error(err); }
                } else {
                    const dest = postLoginRedirect || "/patient";
                    navigate(dest);
                }
            } else {
                alert(data.message || "Login failed");
            }
        } catch (err) {
            console.error("Login request error:", err);
            alert("Network error while logging in");
        } finally {
            setLoading(false);
        }
    };

    const handleSignup = async (e) => {
        if (e && e.preventDefault) e.preventDefault();
        if (password !== confirmPassword) { alert("Passwords do not match"); return; }
        setLoading(true);
        try {
            const res = await fetch("http://localhost:4000/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json().catch(() => ({}));
            if (res.ok) {
                try { localStorage.setItem("isLoggedIn", "true"); } catch (err) {}
                close();
                navigate(postLoginRedirect || "/dashboard");
            } else {
                alert(data.message || data.error || "Signup failed");
            }
        } catch (err) {
            console.error("Signup request error:", err);
            alert("Network error while signing up");
        } finally { setLoading(false); }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content fade-in">
                <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
                    {isLogin ? "Login" : "Signup"}
                </h2>

                <form onSubmit={isLogin ? handleLogin : handleSignup}>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="Email"
                        className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />

                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="Password"
                        className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />

                    {!isLogin && (
                        <input
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            type="password"
                            placeholder="Confirm Password"
                            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition mb-4"
                    >
                        {loading ? (isLogin ? "Logging in..." : "Signing up...") : isLogin ? "Login" : "Signup"}
                    </button>
                </form>

                <div className="mt-3 text-center">
                    <span className="text-blue-600 font-medium cursor-pointer hover:underline" onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? "Create account" : "Already have an account? Login"}
                    </span>
                </div>

                <button onClick={() => { close(); if (!isLogin && typeof openSignup === "function") openSignup(); }} className="w-full mt-5 bg-gray-200 py-3 rounded-lg font-medium hover:bg-gray-300 transition">
                    Close
                </button>
            </div>
        </div>
    );
}
