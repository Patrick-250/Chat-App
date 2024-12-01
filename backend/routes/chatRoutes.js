import express from "express";
import { createMessage, getAllMessages } from "../models/Message.js";

const router = express.Router();

// Fetch chat messages between two users
router.get("/:user1/:user2", (req, res) => {
  try {
    const messages = getAllMessages();
    const filteredMessages = messages.filter(
      (message) =>
        (message.sender === req.params.user1 &&
          message.receiver === req.params.user2) ||
        (message.sender === req.params.user2 &&
          message.receiver === req.params.user1)
    );
    res.json(filteredMessages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Send a chat message
router.post("/", (req, res) => {
  const { sender, receiver, text } = req.body;

  try {
    const messageId = createMessage(sender, receiver, text);
    res.json({ id: messageId, sender, receiver, text });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

export default router;
