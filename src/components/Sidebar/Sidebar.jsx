import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import OnlineUsers from "../OnlineUsers/OnlineUsers";
const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleUserClick = (user) => {
    navigate(`/chat/${user}`);
  };

  // Check if the current path is /profile
  if (location.pathname === "/profile") {
    return null; // Do not render the Sidebar
  }

  return (
    <aside className="sidebar">
      <h1 style={{ marginTop: "50px", color: "green" }}>Online</h1>
      <OnlineUsers onUserClick={handleUserClick} />
    </aside>
  );
};

export default Sidebar;
