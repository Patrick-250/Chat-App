// src/components/Header/Header.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faBell,
  faComments,
} from "@fortawesome/free-solid-svg-icons";
import "./Header.css";

const Header = ({ newMessagesCount }) => {
  return (
    <header className="header">
      <div className="logo">Logo</div>
      <input type="text" placeholder="Search..." className="search-bar" />
      <nav className="nav-links">
        <Link to="/">
          <FontAwesomeIcon icon={faHome} /> Feed
        </Link>
        <Link to="/profile">
          <FontAwesomeIcon icon={faUser} /> Profile
        </Link>
        <Link to="/notifications">
          <FontAwesomeIcon icon={faBell} /> Notifications
        </Link>
        <Link to="/chat">
          <FontAwesomeIcon icon={faComments} /> Chat
          {newMessagesCount > 0 && (
            <span className="new-messages-count">{newMessagesCount}</span>
          )}
        </Link>
      </nav>
    </header>
  );
};

export default Header;
