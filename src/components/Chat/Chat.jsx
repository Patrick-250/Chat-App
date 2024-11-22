import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { FaPaperPlane, FaImage, FaCamera } from "react-icons/fa";
import { Tooltip } from "@mui/material";
import "./Chat.css";
import ChatHeader from "../ChatHeader/ChatHeader";

const socket = io("http://localhost:5000"); // Adjust the URL as needed

const Chat = () => {
  const { user } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [unrespondedCount, setUnrespondedCount] = useState({});
  const [userStatus, setUserStatus] = useState({}); // Define userStatus

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
      const message = {
        text: input,
        sender: "You",
        receiver: user,
        timestamp: new Date(),
      };
      socket.emit("message", message);
      setMessages((prevMessages) => [...prevMessages, message]);
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

  const handleSelectImage = () => {
    // Logic to select an image from the gallery
    console.log("Select image from gallery");
  };

  const handleTakePicture = () => {
    // Logic to take a picture
    console.log("Take a picture");
  };

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
                  <div className="message-content">
                    <div className="message-text">{message.text}</div>
                    <div className="message-timestamp">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
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
            <Tooltip title="Select Image">
              <button onClick={handleSelectImage} className="chat-icon-button">
                <FaImage />
              </button>
            </Tooltip>
            <Tooltip title="Take Picture">
              <button onClick={handleTakePicture} className="chat-icon-button">
                <FaCamera />
              </button>
            </Tooltip>
            <Tooltip title="Send Message">
              <button onClick={handleSendMessage} className="chat-icon-button">
                <FaPaperPlane />
              </button>
            </Tooltip>
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
