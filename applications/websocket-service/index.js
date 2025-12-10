"use strict";

require("dotenv").config();
const http = require("http");
const express = require("express");
const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

const PORT = parseInt(process.env.PORT || "6000", 10);
const SERVICE_JWT_SECRET = process.env.SERVICE_JWT_SECRET || "service_secret_example";

app.get("/health", (req, res) => res.json({ ok: true, service: "websocket-service" }));

io.use((socket, next) => {
  const token = socket.handshake.auth?.token || socket.handshake.headers["x-internal-token"];
  if (!token) return next(new Error("Missing token"));
  try {
    jwt.verify(token, SERVICE_JWT_SECRET);
    next();
  } catch (e) {
    next(new Error("Invalid token"));
  }
});

io.on("connection", (socket) => {
  console.log("WS connected", socket.id);

  socket.on("join", (room) => { socket.join(room); });
  socket.on("chat", (msg) => {
    // broadcast to room if provided
    if (msg.room) io.to(msg.room).emit("message", { from: msg.from || "anon", text: msg.text, time: Date.now() });
    else io.emit("message", { from: msg.from || "anon", text: msg.text, time: Date.now() });
  });

  socket.on("disconnect", () => console.log("WS disconnected", socket.id));
});

server.listen(PORT, () => console.log(`WebSocket service running on ${PORT}`));
