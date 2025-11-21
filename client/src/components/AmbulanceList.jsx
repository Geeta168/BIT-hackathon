export default function AmbulanceList({ visible }) {
  if (!visible) return null;
  const ambulances = [
    { name: "Ambulance 1", hospital: "PGI Chandigarh", distanceKm: 5, eta: "10 mins", phone: 7565664455 },
    { name: "Ambulance 2", hospital: "Fortis Mohali", distanceKm: 8, eta: "15 mins", phone: 8765432109 }
  ];

  ambulances.sort((a,b) => a.distanceKm - b.distanceKm);

  return (
    <div id="ambulance-list">
      {ambulances.map((a, i) => (
        <div key={i} className="item show">
          <strong>{a.name}</strong><br/>
          Hospital: {a.hospital}<br/>
          Distance: {a.distanceKm} km<br/>
          ETA: {a.eta}<br/>
          Phone: <a href={`tel:${a.phone}`}>{a.phone}</a><br/>
          <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(a.hospital)}`} target="_blank" rel="noreferrer">📍 View on Map</a>
        </div>
      ))}
    </div>
  );
}
