// models/Message.js
import db from "../db.js";

export const createMessage = async (senderId, content) => {
  const [result] = await db.query(
    "INSERT INTO messages (sender_id, content) VALUES (?, ?)",
    [senderId, content]
  );
  return result.insertId;
};

export const getAllMessages = async () => {
  const [rows] = await db.query("SELECT * FROM messages");
  return rows;
};
