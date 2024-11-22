// routes/userRoutes.js
import express from "express";
import { createUser, getUserByUsername } from "../models/User.js";

const router = express.Router();

// Register a new user
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userId = await createUser(username, password);
    res.status(201).json({ id: userId, username });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login a user
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await getUserByUsername(username);
    if (!user || user.password !== password) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
