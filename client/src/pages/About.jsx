import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <header className="bg-blue-800 text-white py-6 text-center">
        <h1 className="text-3xl font-bold">About HealTech</h1>
      </header>

      {/* CONTENT */}
    
      <section className="max-w-3xl mx-auto px-6 py-10">
        
        <h2 className="text-2xl font-bold text-blue-900">Who We Are</h2>
        <p className="mt-3 text-gray-700 leading-relaxed">
          HealTech is a telemedicine platform designed to connect rural communities 
          with healthcare professionals. We believe that healthcare is a right, 
          not a privilege, and our mission is to bring quality medical services 
          to every corner of the country.
        </p>

        <h2 className="text-2xl font-bold text-blue-900 mt-10">Our Vision</h2>
        <p className="mt-3 text-gray-700 leading-relaxed">
          We aim to eliminate the healthcare gap in underserved regions by 
          leveraging technology, AI, and a pool of dedicated doctors.
        </p>

        <h2 className="text-2xl font-bold text-blue-900 mt-10">Our Approach</h2>
        <p className="mt-3 text-gray-700 leading-relaxed">
          From AI-powered symptom checkers to video consultations, we offer 
          holistic healthcare solutions designed for accessibility, affordability, 
          and reliability.
        </p>

        <Link
          to="/"
          className="inline-block mt-10 text-blue-600 hover:underline font-semibold"
        >
          ⬅ Back to Home
        </Link>
      </section>
    </div>
  );
}
