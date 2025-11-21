import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:3000"; // change if needed

export default function CallModal({ callInfo, onClose }) {
  const socketRef = useRef(null);
  const localStreamRef = useRef(null);
  const peersRef = useRef({}); // keyed by socketId
  const videoRoomRef = useRef(null);

  useEffect(() => {
    if (!callInfo) return;

    // open modal and start call
    const start = async () => {
      socketRef.current = io(SOCKET_URL);
      const videoRoom = videoRoomRef.current;
      videoRoom.innerHTML = "";
      document.getElementById("callStatus")?.innerText && (document.getElementById("callStatus").innerText = "Connecting…");
      document.getElementById("callDoctorName") && (document.getElementById("callDoctorName").innerText = callInfo.doctorName);

      try {
        localStreamRef.current = await navigator.mediaDevices.getUserMedia({
          video: callInfo.isVideo,
          audio: true,
        });

        const localVideo = document.createElement("video");
        localVideo.srcObject = localStreamRef.current;
        localVideo.muted = true;
        localVideo.autoplay = true;
        localVideo.playsInline = true;
        localVideo.style.width = "160px";
        videoRoom.appendChild(localVideo);
      } catch (err) {
        console.error("getUserMedia error:", err);
      }

      socketRef.current.emit("join-room", callInfo.roomName);

      socketRef.current.on("user-connected", async (userId) => {
        // create peer connection & send offer
        const pc = new RTCPeerConnection();
        peersRef.current[userId] = pc;
        localStreamRef.current.getTracks().forEach(track => pc.addTrack(track, localStreamRef.current));

        pc.ontrack = (e) => {
          const remoteVideo = document.createElement("video");
          remoteVideo.srcObject = e.streams[0];
          remoteVideo.autoplay = true;
          remoteVideo.playsInline = true;
          remoteVideo.style.width = "220px";
          videoRoom.appendChild(remoteVideo);
        };

        pc.onicecandidate = (e) => {
          if (e.candidate) socketRef.current.emit("signal", { to: userId, signal: { candidate: e.candidate } });
        };

        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        socketRef.current.emit("signal", { to: userId, signal: { sdp: offer } });
      });

      socketRef.current.on("signal", async (data) => {
        // { from, signal: { sdp | candidate } }
        const from = data.from;
        let pc = peersRef.current[from];
        if (!pc) {
          pc = new RTCPeerConnection();
          peersRef.current[from] = pc;
          localStreamRef.current.getTracks().forEach(track => pc.addTrack(track, localStreamRef.current));

          pc.ontrack = (e) => {
            const remoteVideo = document.createElement("video");
            remoteVideo.srcObject = e.streams[0];
            remoteVideo.autoplay = true;
            remoteVideo.playsInline = true;
            remoteVideo.style.width = "220px";
            videoRoom.appendChild(remoteVideo);
          };

          pc.onicecandidate = (e) => {
            if (e.candidate) socketRef.current.emit("signal", { to: from, signal: { candidate: e.candidate } });
          };
        }

        if (data.signal.sdp) {
          await pc.setRemoteDescription(new RTCSessionDescription(data.signal.sdp));
          if (data.signal.sdp.type === "offer") {
            const answer = await pc.createAnswer();
            await pc.setLocalDescription(answer);
            socketRef.current.emit("signal", { to: from, signal: { sdp: answer } });
          }
        }

        if (data.signal.candidate) {
          try {
            await pc.addIceCandidate(new RTCIceCandidate(data.signal.candidate));
          } catch (e) {
            console.warn("Error adding ice candidate", e);
          }
        }
      });

      socketRef.current.on("user-disconnected", (id) => {
        if (peersRef.current[id]) {
          peersRef.current[id].close();
          delete peersRef.current[id];
        }
      });

      // set status connected
      setTimeout(() => {
        const statusEl = document.getElementById("callStatus");
        if (statusEl) statusEl.innerText = "Connected ✅";
      }, 1200);
    };

    start();

    return () => {
      // cleanup on modal close
      Object.values(peersRef.current).forEach(pc => pc.close());
      peersRef.current = {};
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach(t => t.stop());
      }
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [callInfo]);

  if (!callInfo) return null;

  return (
    <div className="call-modal" style={{display:"flex"}}>
      <div className="call-box">
        <div style={{display:"flex", alignItems:"center", gap:12}}>
          <img
            src="/5f90954d-963c-496c-a87c-a9d4d4b02b93.png"
            alt="doctor"
            className="placeholder-img"
            style={{width:72, height:72}}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120"><circle cx="60" cy="60" r="58" fill="%23d1d5db" stroke="%232563eb" stroke-width="3"/><text x="60" y="72" font-size="18" font-family="Segoe UI, sans-serif" text-anchor="middle" fill="%23000">doc</text></svg>';
            }}
          />
          <h3 id="callDoctorName">{callInfo.doctorName}</h3>
        </div>
        <div className="call-status" id="callStatus">Connecting…</div>
        <div id="video-room" ref={videoRoomRef => { videoRoomRef && (videoRoomRef.current = videoRoomRef); }} />
        <button className="end-call" onClick={() => onClose()}>End Call</button>
      </div>
    </div>
  );
}
