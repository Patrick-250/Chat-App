// server.js
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import db from "./db.js";
import userRoutes from "./routes/userRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
