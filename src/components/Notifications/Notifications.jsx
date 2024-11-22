// src/components/Notifications/Notifications.jsx
import React from "react";
import "./Notifications.css";

const Notifications = () => {
  const notifications = [
    "User1 liked your post",
    "User2 commented on your post",
    "User3 wants to be your friend",
  ];

  return (
    <div className="notifications">
      <h2>Notifications</h2>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>{notification}</li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
