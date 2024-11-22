import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBell,
  faComments,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import "./Header.css";

const Header = ({ newMessagesCount }) => {
  const handleLogoClick = () => {
    window.location.reload();
  };

  return (
    <header className="header">
      <div
        className="logo"
        onClick={handleLogoClick}
        style={{ cursor: "pointer" }}
      >
        <img src="/Images/logo.png" alt="Logo" style={{ height: "40px" }} />{" "}
      </div>
      <div className="search-container">
        <input type="text" placeholder="Search..." className="search-bar" />
        <button className="search-button">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
      <nav className="nav-links">
        <Link to="/">
          <FontAwesomeIcon icon={faHome} />
        </Link>
        <Link to="/chat">
          <FontAwesomeIcon icon={faComments} />
          {newMessagesCount > 0 && (
            <span className="new-messages-count">{newMessagesCount}</span>
          )}
        </Link>
        <Link to="/notifications">
          <FontAwesomeIcon icon={faBell} />
        </Link>
        <Link to="/profile">
          <img
            src="/Images/profile.jpeg"
            alt="Profile"
            className="profile-picture"
          />
        </Link>
      </nav>
    </header>
  );
};

export default Header;
