import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginModal({ isOpen, close, openSignup, postLoginRedirect, onLoginSuccess }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    if (!isOpen) return null;

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
            <div className="modal-overlay">
                <div className="modal-content fade-in">

                {/* Heading */}
                <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
                    Login
                </h2>

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
