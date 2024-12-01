import express from "express";
import http from "http";
import cors from "cors";
import { Server as SocketIOServer } from "socket.io";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: "http://localhost:5173", // Update this to match your frontend URL
    methods: ["GET", "POST"],
  },
});

// Create a connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Enable CORS
app.use(cors());

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/chats", chatRoutes);

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("message", (message) => {
    console.log(`Received message: ${message}`);
    // Broadcast the message to all clients
    io.emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

app.get("/", (req, res) => {
  res.send("Server is running");
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
