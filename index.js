import express from "express";

import http from "http";
import cors from "cors";
import { Server, Socket } from "socket.io";
const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: "http://localhost:3002",
  methods: ["GET", "POST"],
});

io.on("connection", (socket) => {
  console.log("User Connected ");
  socket.on("join_room", (data) => {
    socket.join(data);
    console.log("hdhdh");
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receve_massage", data);
  });

  socket.on("disconnect", () => {
    console.log("user Disconnected ");
  });
});

server.listen(3001, () => {
  console.log("SERVER RUNNING");
});
