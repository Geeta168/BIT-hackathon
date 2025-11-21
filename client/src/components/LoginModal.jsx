export default function LoginModal({ isOpen, close, openSignup }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
            <div className="bg-white w-96 p-8 rounded-3xl shadow-2xl fade-in">

                {/* Heading */}
                <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
                    Login
                </h2>

                {/* Email */}
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {/* Password */}
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-3 mb-5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {/* Login Button */}
                <button
                    className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
                >
                    Login
                </button>

                {/* Signup Link */}
                <span
                    className="text-blue-600 font-medium cursor-pointer hover:underline"
                    onClick={() => {
                        close();
                        openSignup();
                    }}
                >
                    Create account
                </span>
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
