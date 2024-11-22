// src/components/ChatHeader/ChatHeader.jsx
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faVideo } from "@fortawesome/free-solid-svg-icons";
import "./ChatHeader.css";

const ChatHeader = ({ user, isOnline, lastSeen }) => {
  const getLastSeenText = (lastSeen) => {
    const now = new Date();
    const lastSeenDate = new Date(lastSeen);
    const diffInMinutes = Math.floor((now - lastSeenDate) / 60000);

    if (diffInMinutes < 1) {
      return "just now";
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)} hours ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)} days ago`;
    }
  };

  return (
    <div className="chat-header">
      <div className="chat-header-info">
        <h3 style={{ color: "white", marginLeft: "10px" }}>{user}</h3>
        <p className={`chat-header-status ${isOnline ? "online" : ""}`}>
          {isOnline ? "Online" : `Last seen ${getLastSeenText(lastSeen)}`}
        </p>
      </div>
      <div className="chat-header-icons">
        <FontAwesomeIcon icon={faPhone} className="chat-header-icon" />
        <FontAwesomeIcon icon={faVideo} className="chat-header-icon" />
      </div>
    </div>
  );
};

export default ChatHeader;
