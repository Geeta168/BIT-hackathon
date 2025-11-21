export default function EmergencyButtons({ onVideo, onAudio, onAmbulance }) {
  return (
    <div className="emergency-buttons">
      <button className="video-btn" onClick={onVideo}>🎥 Video Call</button>
      <button className="audio-btn" onClick={onAudio}>📞 Audio Call</button>
      <button className="ambulance-btn" onClick={onAmbulance}>🚑 Need Ambulance Service?</button>
    </div>
  );
}
