// routes/messageRoutes.js
import express from "express";
import { createMessage, getAllMessages } from "../models/Message.js";

const router = express.Router();

// Send a message
router.post("/", async (req, res) => {
  const { senderId, content } = req.body;
  try {
    const messageId = await createMessage(senderId, content);
    res.status(201).json({ id: messageId, senderId, content });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all messages
router.get("/", async (req, res) => {
  try {
    const messages = await getAllMessages();
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
