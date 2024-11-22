import express from "express";
import http from "http";
import cors from "cors";
import { Server as SocketIOServer } from "socket.io";
import chatRoutes from "./routes/chatRoutes.js";

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: "http://localhost:5173", // Update this to match your frontend URL
    methods: ["GET", "POST"],
  },
});

// Enable CORS
app.use(cors());

app.use(express.json());
app.use("/chat", chatRoutes);

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
