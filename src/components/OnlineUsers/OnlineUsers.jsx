// src/components/OnlineUsers/OnlineUsers.jsx
import React from "react";
import "./OnlineUsers.css";

const OnlineUsers = ({ onUserClick }) => {
  const users = ["Friend1", "Friend2", "Friend3"];

  return (
    <div className="online-users">
      <h2>Online Users</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            <a href="#" onClick={() => onUserClick(user)}>
              {user}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OnlineUsers;
