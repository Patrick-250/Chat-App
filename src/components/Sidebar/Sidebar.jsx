// src/components/Sidebar/Sidebar.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";
import OnlineUsers from "../OnlineUsers/OnlineUsers";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleUserClick = (user) => {
    navigate(`/chat/${user}`);
  };

  return (
    <aside className="sidebar">
      <h1 style={{ marginTop: "30px", color: "green" }}>Online</h1>
      <OnlineUsers onUserClick={handleUserClick} />
    </aside>
  );
};

export default Sidebar;
