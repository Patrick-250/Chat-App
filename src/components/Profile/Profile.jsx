// src/components/Profile/Profile.jsx
import React, { useState } from "react";
import "./Profile.css";

const Profile = () => {
  const [language, setLanguage] = useState("English");
  const [view, setView] = useState("profile");

  const handleEditProfile = () => {
    // Add logic to edit profile
    console.log("Edit Profile clicked");
  };

  const handleShareProfile = () => {
    // Add logic to share profile
    console.log("Share Profile clicked");
  };

  const handleBlockedAccounts = () => {
    // Add logic to view blocked accounts
    console.log("Blocked Accounts clicked");
  };

  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    setLanguage(selectedLanguage);
    console.log("Language changed to:", selectedLanguage);
  };

  const handleDeactivateAccount = () => {
    // Add logic to deactivate account
    console.log("Deactivate Account clicked");
  };

  const handleChangePassword = () => {
    // Add logic to change password
    console.log("Change Password clicked");
  };

  const handleSignOut = () => {
    // Add logic to sign out
    console.log("Sign Out clicked");
  };

  const handlePosts = () => {
    // Add logic to view posts
    setView("posts");
    console.log("Posts clicked");
  };

  const handleGallery = () => {
    // Add logic to view gallery
    setView("gallery");
    console.log("Gallery clicked");
  };

  return (
    <div className="profile">
      <div className="profile-header">
        <img
          src="profile-picture-url"
          alt="Profile"
          className="profile-picture"
        />
        <h2>Your Name</h2>
        <a href="#" onClick={handleEditProfile} className="profile-link">
          Edit Profile
        </a>
      </div>
      <div className="profile-content">
        {view === "profile" && (
          <>
            <div className="profile-section">
              <h3>
                <a href="#" onClick={handlePosts} className="profile-link">
                  Posts
                </a>
              </h3>
              {/* Add your posts here */}
            </div>
            <div className="profile-section">
              <h3>
                <a href="#" onClick={handleGallery} className="profile-link">
                  Gallery
                </a>
              </h3>
              {/* Add your gallery here */}
            </div>
            <div className="profile-section">
              <h3>Share Profile</h3>
              <a href="#" onClick={handleShareProfile} className="profile-link">
                Share Profile
              </a>
            </div>
            <div className="profile-section">
              <h3>Security and Activities</h3>
              <ul>
                <li>
                  <a
                    href="#"
                    onClick={handleBlockedAccounts}
                    className="profile-link"
                  >
                    Blocked Accounts
                  </a>
                </li>
                <li>
                  <label htmlFor="language-select" className="profile-link">
                    Language
                  </label>
                  <select
                    id="language-select"
                    value={language}
                    onChange={handleLanguageChange}
                    className="profile-link"
                  >
                    <option value="English">English</option>
                    <option value="French">French</option>
                  </select>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={handleDeactivateAccount}
                    className="profile-link"
                  >
                    Deactivate Account
                  </a>
                </li>
              </ul>
            </div>
          </>
        )}
        {view === "posts" && (
          <div className="profile-section">
            <h3>Your Posts</h3>
            {/* Display user posts here */}
          </div>
        )}
        {view === "gallery" && (
          <div className="profile-section">
            <h3>Your Gallery</h3>
            {/* Display user pictures and videos here */}
          </div>
        )}
      </div>
      <div className="profile-actions">
        <a href="#" onClick={handleChangePassword} className="profile-link">
          Change Password
        </a>
        <a href="#" onClick={handleSignOut} className="profile-link">
          Sign Out
        </a>
      </div>
    </div>
  );
};

export default Profile;
