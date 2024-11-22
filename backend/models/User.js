// models/User.js
import db from "../db.js";

export const createUser = async (username, password) => {
  const [result] = await db.query(
    "INSERT INTO users (username, password) VALUES (?, ?)",
    [username, password]
  );
  return result.insertId;
};

export const getUserByUsername = async (username) => {
  const [rows] = await db.query("SELECT * FROM users WHERE username = ?", [
    username,
  ]);
  return rows[0];
};
