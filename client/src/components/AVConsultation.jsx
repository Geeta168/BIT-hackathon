import React, { useCallback, useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../context/socketProvider.jsx';  

export default function AVConsultation()  {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");

   const socket = useSocket();
   const navigate=useNavigate()

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    console.log("email:", email);
     socket.emit("room:join", { email, room });
  }, [email, room,socket]);

  const handleJoinRoom=useCallback((data)=>{
    const{email, room}= data
  navigate(`/room/${room}`);
  },[navigate]);



  useEffect(()=>{
    socket.on("room:joined",handleJoinRoom);
   
     return()=>{
      socket.off("room:joined",handleJoinRoom);
       
     }
  },[socket,handleJoinRoom]);

  return (
    <div>
      <h1>Lobby</h1>

      <form onSubmit={handleSubmit}> 

        <label>Email</label><br />
        <input 
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br /><br />

        <label>Room Number</label><br />
        <input 
          type="text" 
          id="room"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />

        <br /><br />

        <button type="submit">Join</button>
      </form>
    </div>
  );
}







