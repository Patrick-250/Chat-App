// src/components/Chat/Chat.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import "./Chat.css";
import ChatHeader from "../ChatHeader/ChatHeader";

const socket = io("http://localhost:5000"); // Adjust the URL as needed

const Chat = () => {
  const { user } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    { sender: "Friend1", text: "Hello!", receiver: "You" },
    { sender: "You", text: "Hi!", receiver: "Friend1" },
    { sender: "Friend2", text: "How are you?", receiver: "You" },
    { sender: "You", text: "I am fine, thanks!", receiver: "Friend2" },
    { sender: "Friend3", text: "Good morning!", receiver: "You" },
  ]);
  const [input, setInput] = useState("");
  const [unrespondedCount, setUnrespondedCount] = useState({
    Friend1: 1,
    Friend2: 1,
    Friend3: 1,
  });

  // Mock data for online status and last seen information
  const userStatus = {
    Friend1: { isOnline: true, lastSeen: new Date().toISOString() },
    Friend2: {
      isOnline: false,
      lastSeen: new Date(Date.now() - 3600000).toISOString(),
    }, // 1 hour ago
    Friend3: {
      isOnline: false,
      lastSeen: new Date(Date.now() - 86400000).toISOString(),
    }, // 1 day ago
  };

  useEffect(() => {
    console.log("Component mounted");
    console.log("User:", user);

    socket.on("message", (message) => {
      console.log("Received message:", message);
      setMessages((prevMessages) => [...prevMessages, message]);
      setUnrespondedCount((prevCount) => ({
        ...prevCount,
        [message.sender]: (prevCount[message.sender] || 0) + 1,
      }));
    });

    return () => {
      console.log("Component unmounted");
      socket.off("message");
    };
  }, [user]);

  const handleSendMessage = () => {
    if (input.trim() && user) {
      console.log("Sending message:", input);
      socket.emit("message", { text: input, sender: "You", receiver: user });
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: input, sender: "You", receiver: user },
      ]);
      setInput("");
      setUnrespondedCount((prevCount) => ({
        ...prevCount,
        [user]: 0,
      }));
    }
  };

  const handleUserClick = (user) => {
    navigate(`/chat/${user}`);
  };

  const getLastMessage = (user) => {
    const userMessages = messages.filter(
      (message) => message.sender === user || message.receiver === user
    );
    return userMessages.length > 0
      ? userMessages[userMessages.length - 1].text
      : "";
  };

  const uniqueSenders = [...new Set(messages.map((message) => message.sender))];

  return (
    <div className="chat">
      {user ? (
        <>
          <ChatHeader
            user={user}
            isOnline={userStatus[user]?.isOnline}
            lastSeen={userStatus[user]?.lastSeen}
          />
          <div className="chat-messages">
            {messages
              .filter(
                (message) =>
                  (message.sender === user && message.receiver === "You") ||
                  (message.receiver === user && message.sender === "You")
              )
              .map((message, index) => (
                <div
                  key={index}
                  className={`chat-message ${
                    message.sender === "You" ? "sent" : "received"
                  }`}
                >
                  {message.text}
                </div>
              ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={input}
              onChange={(e) => {
                console.log("Input changed:", e.target.value);
                setInput(e.target.value);
              }}
              placeholder="Type a message..."
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </>
      ) : (
        <div className="chat-messages">
          <h2>Messages</h2>
          {uniqueSenders.map((sender) => (
            <div
              key={sender}
              className="chat-message"
              onClick={() => handleUserClick(sender)}
            >
              <strong>{sender}</strong>
              <div className="last-message">{getLastMessage(sender)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Chat;
