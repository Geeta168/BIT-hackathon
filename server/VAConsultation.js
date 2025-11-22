import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  }
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join", (roomId) => {
    socket.join(roomId);
    socket.to(roomId).emit("joined", socket.id);
  });

  socket.on("offer", ({ roomId, offer }) => {
    socket.to(roomId).emit("offer", offer);
  });

  socket.on("answer", ({ roomId, answer }) => {
    socket.to(roomId).emit("answer", answer);
  });

  socket.on("ice", ({ roomId, candidate }) => {
    socket.to(roomId).emit("ice", candidate);
  });
});

server.listen(4000, () => console.log("Signaling server running on 4000"));




// // server.js
// const express = require("express");
// const http = require("http");
// const { Server } = require("socket.io");
// const cors = require("cors");

// const app = express();
// app.use(cors());
// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: { origin: "*" },
// });

// io.on("connection", (socket) => {
//   console.log("socket connected:", socket.id);

//   socket.on("join-room", (roomId) => {
//     socket.join(roomId);
//     console.log(`${socket.id} joined ${roomId}`);
//     // notify others in room
//     socket.to(roomId).emit("peer-joined", socket.id);
//   });

//   socket.on("offer", ({ roomId, offer, from }) => {
//     socket.to(roomId).emit("offer", { offer, from });
//   });

//   socket.on("answer", ({ roomId, answer, from }) => {
//     socket.to(roomId).emit("answer", { answer, from });
//   });

//   socket.on("ice-candidate", ({ roomId, candidate, from }) => {
//     socket.to(roomId).emit("ice-candidate", { candidate, from });
//   });

//   socket.on("leave-room", (roomId) => {
//     socket.leave(roomId);
//     socket.to(roomId).emit("peer-left", socket.id);
//   });

//   socket.on("disconnect", () => {
//     console.log("socket disconnected:", socket.id);
//     // optionally notify rooms (can be improved)
//   });
// });

// app.get("/", (req, res) => res.send("Signaling server running"));

// const PORT = process.env.PORT || 4000;
// server.listen(PORT, () => console.log("Signaling server on port", PORT));

