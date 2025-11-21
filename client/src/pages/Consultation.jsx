import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import "./consultation.css"; // CSS file (given below)

export default function Consultation() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const specialties = [
    {
      name: "General Medicine",
      desc: "Routine check-ups, fever, infections, general health concerns.",
      img: "https://cdn-icons-png.flaticon.com/512/3774/3774299.png"
    },
    {
      name: "Surgery",
      desc: "Operations, post-surgical care, injury treatments.",
      img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
    },
    {
      name: "Psychiatry",
      desc: "Depression, anxiety, stress, emotional wellbeing.",
      img: "https://cdn-icons-png.flaticon.com/512/4249/4249947.png"
    },
    {
      name: "Neurology",
      desc: "Brain, nerves, epilepsy, seizures, headaches.",
      img: "https://cdn-icons-png.flaticon.com/512/4082/4082819.png"
    },
    {
      name: "Cardiology",
      desc: "Heart check-ups, chest pain, hypertension.",
      img: "https://cdn-icons-png.flaticon.com/512/709/709496.png"
    },
    {
      name: "Dermatology",
      desc: "Skin problems, rashes, acne, cosmetic treatments.",
      img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
    },
    {
      name: "ENT",
      desc: "Ear, nose, throat infections, allergies, sinus.",
      img: "https://cdn-icons-png.flaticon.com/512/4359/4359963.png"
    },
    {
      name: "Orthopedics",
      desc: "Bone fractures, joint pain, arthritis, sports injuries.",
      img: "https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
    },
    {
      name: "Gynecology",
      desc: "Pregnancy care, menstrual and hormonal concerns.",
      img: "https://cdn-icons-png.flaticon.com/512/1997/1997444.png"
    },
    {
      name: "Pediatrics",
      desc: "Child growth, vaccinations, common childhood diseases.",
      img: "https://cdn-icons-png.flaticon.com/512/4320/4320337.png"
    },
    {
      name: "Ophthalmology",
      desc: "Eye check-ups, vision correction, cataracts.",
      img: "https://cdn-icons-png.flaticon.com/512/4320/4320337.png"
    },
    {
      name: "Dental",
      desc: "Toothaches, cleaning, braces, cavities.",
      img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
    },
    {
      name: "Nephrology",
      desc: "Kidney check-ups, dialysis, urinary issues.",
      img: "https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
    },
    {
      name: "Gastroenterology",
      desc: "Digestive health, acidity, liver care.",
      img: "https://cdn-icons-png.flaticon.com/512/4359/4359963.png"
    },
    {
      name: "Oncology",
      desc: "Cancer care, tumor treatment, screenings.",
      img: "https://cdn-icons-png.flaticon.com/512/4320/4320337.png"
    },
    {
      name: "Pulmonology",
      desc: "Asthma, lung infections, breathing difficulties.",
      img: "https://cdn-icons-png.flaticon.com/512/1997/1997444.png"
    }
  ];

  const filtered = specialties.filter(
    (s) =>
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.desc.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="wrap">
      <header className="app-header">
        <div></div>

        <h1>Find Doctor Specialty</h1>

        <div className="header-right">
          <div className="search">
            <input
              type="text"
              placeholder="Search specialty (e.g. skin, heart, child)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
      </header>

      <main>
        <section className="grid">
            {filtered.map((s) => (
            <div
              key={s.name}
              className="card"
              onClick={() => navigate(`/specialty/${encodeURIComponent(s.name)}`)}
            >
              <div className="media">
                <img src={s.img} alt={s.name} />
              </div>
              <div className="info">
                <h3>{s.name}</h3>
                <p>{s.desc}</p>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
