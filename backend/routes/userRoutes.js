import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createUser, getUserByUsername, getUserById } from "../models/User.js";

const router = express.Router();

// Register a new user
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    let user = getUserByUsername(username);
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userId = createUser(username, hashedPassword);

    const payload = { user: { id: userId } };

    jwt.sign(payload, "secret", { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Login a user
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    console.log("Login request received with:", { username, password });

    let user = getUserByUsername(username);
    if (!user) {
      console.log("User not found");
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Password does not match");
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const payload = { user: { id: user.id } };

    jwt.sign(payload, "secret", { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Fetch user details
router.get("/:id", (req, res) => {
  try {
    const user = getUserById(parseInt(req.params.id));
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json({ id: user.id, username: user.username });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

export default router;
