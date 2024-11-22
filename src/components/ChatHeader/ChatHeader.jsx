import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faVideo } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "@mui/material";
import "./ChatHeader.css";

const ChatHeader = ({ user, isOnline, lastSeen }) => {
  const getLastSeenText = (lastSeen) => {
    if (!lastSeen) {
      return "unknown";
    }

    const now = new Date();
    const lastSeenDate = new Date(lastSeen);

    if (isNaN(lastSeenDate.getTime())) {
      return "unknown";
    }

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
        <h3 style={{ marginLeft: "10px", color: "white" }}>{user}</h3>
        <p className={`chat-header-status ${isOnline ? "online" : ""}`}>
          {isOnline ? "Online" : `Last seen ${getLastSeenText(lastSeen)}`}
        </p>
      </div>
      <div className="chat-header-icons">
        <Tooltip title="Audio Call">
          <FontAwesomeIcon icon={faPhone} className="chat-header-icon" />
        </Tooltip>
        <Tooltip title="Video Call">
          <FontAwesomeIcon icon={faVideo} className="chat-header-icon" />
        </Tooltip>
      </div>
    </div>
  );
};

export default ChatHeader;
