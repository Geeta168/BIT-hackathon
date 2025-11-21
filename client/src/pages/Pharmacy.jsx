import React, { useState, useEffect } from "react";

export default function Pharmacy() {
  const [medicine, setMedicine] = useState("");
  const [pharmaciesList, setPharmaciesList] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  const pharmacies = [
    { name: "Apollo Pharmacy", address: "123 MG Road, Bengaluru, Karnataka", lat: 12.9716, lng: 77.5946 },
    { name: "Fortis Pharmacy", address: "45 Church Street, Bengaluru, Karnataka", lat: 12.975, lng: 77.605 },
    { name: "City Care Pharmacy", address: "78 Residency Road, Bengaluru, Karnataka", lat: 12.97, lng: 77.6 },
    { name: "Sunrise Pharmacy", address: "56 Brigade Road, Bengaluru, Karnataka", lat: 12.972, lng: 77.603 },
    { name: "HealthPlus Pharmacy", address: "89 MG Road, Bengaluru, Karnataka", lat: 12.973, lng: 77.598 }
  ];

  // Get current user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      });
    }
  }, []);

  function sanitizeInput(text) {
    return text.replace(/[^a-zA-Z0-9 ]/g, "").trim().toLowerCase();
  }

  function searchMedicine() {
    const q = sanitizeInput(medicine);
    if (!q) return alert("Please enter medicine name.");
    filterPharmacies(q);
  }

  function startVoiceSearch() {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Voice recognition not supported.");
      return;
    }
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-IN";
    recognition.start();
    recognition.onresult = (event) => {
      const transcript = sanitizeInput(event.results[0][0].transcript);
      setMedicine(transcript);
      filterPharmacies(transcript);
    };
  }

  function filterPharmacies(query) {
    let results = pharmacies.map(p => ({
      ...p,
      stock: Math.floor(Math.random() * 50) + 1,
    }));

    if (userLocation) {
      results.sort(
        (a, b) =>
          getDistance(userLocation.lat, userLocation.lng, a.lat, a.lng) -
          getDistance(userLocation.lat, userLocation.lng, b.lat, b.lng)
      );
    }

    setPharmaciesList(results);
  }

  function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = degToRad(lat2 - lat1);
    const dLon = degToRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(degToRad(lat1)) *
        Math.cos(degToRad(lat2)) *
        Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  function degToRad(deg) {
    return deg * (Math.PI / 180);
  }

  function orderMedicine(pharmacy, med) {
    alert(`Order placed for "${med}" at "${pharmacy}".`);
  }

  function openMap(lat, lng) {
    window.open(`https://www.google.com/maps?q=${lat},${lng}`, "_blank");
  }

  // -------------------- UI ---------------------------
  return (
    <div style={styles.page}>
      {/* NAVBAR */}
      <nav style={styles.nav}>
        <h1 style={styles.logo}>HealTech</h1>
        <div style={styles.links}>
          <a href="/patient">Dashboard</a>
          <a href="#">Services</a>
          <a href="#">Privacy</a>
          <a href="#">Helpline</a>
        </div>
      </nav>

      <h1 style={styles.title}>Pharmacy Medicine Stock</h1>

      <button
        style={styles.backBtn}
        onClick={() => (window.location.href = "/patient")}
      >
        ⬅ Back to Dashboard
      </button>

      {/* SEARCH BAR */}
      <div style={styles.searchContainer}>
        <input
          type="text"
          value={medicine}
          onChange={(e) => setMedicine(e.target.value)}
          placeholder="Search medicine..."
          style={styles.searchInput}
        />
        <button onClick={searchMedicine} style={styles.searchBtn}>
          Search
        </button>
        <button onClick={startVoiceSearch} style={styles.searchBtn}>
          🎤 Voice Input
        </button>
      </div>

      {/* RESULT LIST */}
      <div style={styles.list}>
        {pharmaciesList.map((p, index) => {
          const distance =
            userLocation &&
            getDistance(
              userLocation.lat,
              userLocation.lng,
              p.lat,
              p.lng
            ).toFixed(1);

          return (
            <div key={index} style={styles.item}>
              <h3>{p.name}</h3>
              <p><strong>Address:</strong> {p.address}</p>
              <p><strong>Stock of {medicine}:</strong> {p.stock}</p>
              {distance && <p><strong>Distance:</strong> {distance} km</p>}

              <button
                style={styles.orderBtn}
                onClick={() => orderMedicine(p.name, medicine)}
              >
                Order Now
              </button>

              <button
                style={styles.mapBtn}
                onClick={() => openMap(p.lat, p.lng)}
              >
                View on Map
              </button>
            </div>
          );
        })}
      </div>

      <footer style={styles.footer}>
        © 2025 HealTech |
        <a href="#"> Privacy Policy </a> |
        <a href="#"> Terms of Service </a>
      </footer>
    </div>
  );
}

// ----------------- CSS-IN-JS STYLES -----------------
const styles = {
  page: {
    fontFamily: "Segoe UI",
    background: "linear-gradient(135deg, #a7f3d0, #ffffff, #93c5fd)",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  nav: {
    width: "100%",
    padding: "15px 40px",
    background: "#fff",
    display: "flex",
    justifyContent: "space-between",
    position: "sticky",
    top: 0,
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    zIndex: 10,
  },
  logo: {
    fontSize: "28px",
    fontWeight: "bold",
    background: "linear-gradient(90deg, #2563eb, #16a34a, #f59e0b)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  links: {
    display: "flex",
    gap: "20px",
  },
  title: {
    fontSize: "42px",
    marginTop: "30px",
    color: "#1e40af",
  },
  backBtn: {
    marginTop: "10px",
    padding: "10px 20px",
    borderRadius: "12px",
    border: "none",
    background: "#2563eb",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  },
  searchContainer: {
    marginTop: "20px",
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  searchInput: {
    padding: "12px 15px",
    width: "300px",
    borderRadius: "30px",
    border: "2px solid #2563eb",
    outline: "none",
  },
  searchBtn: {
    padding: "12px 20px",
    borderRadius: "30px",
    border: "none",
    background: "linear-gradient(90deg, #2563eb, #16a34a)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  },
  list: {
    width: "90%",
    maxWidth: "900px",
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  item: {
    background: "#fff",
    padding: "15px 20px",
    borderRadius: "15px",
    boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
  },
  orderBtn: {
    padding: "8px 15px",
    background: "#34d399",
    color: "white",
    border: "none",
    fontWeight: "bold",
    borderRadius: "12px",
    marginRight: "10px",
  },
  mapBtn: {
    padding: "8px 15px",
    background: "#3b82f6",
    color: "white",
    border: "none",
    fontWeight: "bold",
    borderRadius: "12px",
  },
  footer: {
    marginTop: "40px",
    background: "#1e40af",
    color: "white",
    width: "100%",
    textAlign: "center",
    padding: "15px",
  },
};
