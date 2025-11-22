import { useState, useRef, useEffect } from "react";




export default function SymptomChecker() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! 👋 Tell me about your symptoms, and Ill try to help." },
  ]);
  const [input, setInput] = useState("");
  const chatBoxRef = useRef(null);

  // Scroll to bottom when messages update
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  // Mock database (same as your HTML file)
  const mockDatabase = [
    {
      symptoms: ["fever", "cough", "fatigue"],
      disease: "Common Cold or Flu",
      medicine: "Paracetamol, Rest, Hydration",
      solutions: ["Drink warm fluids", "Take rest", "Monitor temperature"],
      specialist: "General Physician",
    },
    {
      symptoms: ["headache", "nausea", "sensitivity to light"],
      disease: "Migraine",
      medicine: "Ibuprofen, Sumatriptan",
      solutions: ["Lie in a dark room", "Avoid screens", "Apply cold compress"],
      specialist: "Neurologist",
    },
    {
      symptoms: ["stomach pain", "diarrhea", "vomiting"],
      disease: "Food Poisoning",
      medicine: "ORS, Loperamide, Probiotics",
      solutions: ["Stay hydrated", "Eat bland foods", "Avoid dairy"],
      specialist: "Gastroenterologist",
    },
    {
      symptoms: ["chest pain", "shortness of breath", "fatigue"],
      disease: "Heart-related issue (possible angina)",
      medicine: "Aspirin (emergency), consult doctor",
      solutions: ["Seek emergency help", "Avoid exertion", "Elevate legs if dizzy"],
      specialist: "Cardiologist",
    },
  ];

  // Send message
  const sendMessage = () => {
    if (!input.trim()) return;

    const userText = input.trim();
    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setInput("");

    setTimeout(() => respondToSymptoms(userText.toLowerCase()), 700);
  };

  // Bot Reply
  const respondToSymptoms =async (text) => {
    try {
    const res = await fetch("http://localhost:4000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text })
    });

    const data = await res.json();

    setMessages((prev) => [
      ...prev,
      { sender: "bot", text: data.reply }
    ]);

  } catch (error) {
    setMessages((prev) => [
      ...prev,
      { sender: "bot", text: "Server error. Please try again later." }
    ]);
  }
}

  return (
    <div
      className="min-h-screen flex flex-col items-center py-10 px-5"
      style={{
        background: "linear-gradient(135deg, #74ebd5, #ACB6E5)",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      {/* Header */}
      <header className="text-center text-white mb-10">
        <h1 className="text-3xl font-bold drop-shadow-lg">AI Symptom Checker 💬</h1>
        <p className="italic text-lg mt-2 text-gray-100">
          "Your health is your wealth – protect it like treasure."
        </p>
      </header>

      {/* Main Container - larger fixed card */}
      <div
        className="flex w-full max-w-6xl gap-6 p-8 rounded-2xl shadow-xl items-stretch"
        style={{
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(12px)",
          minHeight: '520px'
        }}
      >
        {/* Robot Icon */}
        <div
          className="w-36 h-36 rounded-full flex items-center justify-center shadow-lg border-4 border-white"
          style={{
            background: "linear-gradient(135deg, #43e97b, #38cc77)",
          }}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/4712/4712027.png"
            alt="Robot"
            className="w-24 h-24"
          />
        </div>

        {/* Chat Section */}
        <div className="flex flex-col flex-1">
          {/* Input */}
          <div className="flex mb-4">
            <input
              type="text"
              placeholder="Describe your symptoms here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="flex-grow px-5 py-3 rounded-full shadow-md text-lg outline-none"
            />
            <button
              onClick={sendMessage}
              className="ml-4 px-6 py-3 rounded-full text-white font-semibold"
              style={{
                backgroundColor: "#43e97b",
                boxShadow: "0px 4px 12px rgba(67,233,123,0.6)",
              }}
            >
              Send
            </button>
          </div>

          {/* Chat Box */}
          <div
            ref={chatBoxRef}
            className="flex flex-col gap-4 p-5 rounded-2xl shadow-lg flex-1"
            style={{ background: "rgba(255,255,255,0.75)", maxHeight: '400px', overflowY: 'auto' }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`px-5 py-3 rounded-2xl max-w-[75%] whitespace-pre-line text-sm ${
                  msg.sender === "user"
                    ? "bg-blue-400 text-white self-end"
                    : "bg-blue-100 text-gray-900 self-start"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-white mt-10 text-sm">
        © 2025 AI Symptom Checker | Built for educational purposes 🧠
      </footer>
    </div>
  );
}
