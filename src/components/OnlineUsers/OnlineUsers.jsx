import React from "react";
import "./OnlineUsers.css";

const OnlineUsers = ({ onUserClick }) => {
  const users = [
    "Eric Diary",
    "Chris James",
    "Meghan Ryan",
    "Natasha",
    "John",
    "Jane Army",
    "Alice",
    "Bob",
    "Charlie",
    "David",
    "Eve",
    "Frank",
    "Grace",
    "Heidi",
    "Ivan",
    "Judy",
    "Kevin",
    "Larry",
    "Mallory",
    "Nancy",
    "Olivia",
    "Peggy",
    "Quentin",
    "Rita",
    "Steve",
    "Trent",
    "Ursula",
    "Victor",
    "Walter",
    "Xander",
    "Yvonne",
    "Zelda",
  ];

  return (
    <div className="online-users">
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            <a href="#" onClick={() => onUserClick(user)}>
              <span className="online-icon">🟢</span>
              <span className="user-name">{user}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OnlineUsers;
