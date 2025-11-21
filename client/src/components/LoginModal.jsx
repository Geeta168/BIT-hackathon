import React, { useState } from "react";
import { useNavigate } from "react-router-dom";



export default function LoginModal({ isOpen, close, openSignup }) {
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

  


    return (
      <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
            <div className="bg-white w-96 p-8 rounded-3xl shadow-2xl fade-in">

                Heading
                <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
                    {isLogin ? "Login" : "Signup"}
                </h2>

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
