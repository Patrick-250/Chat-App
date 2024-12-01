import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Avatar,
  IconButton,
  MenuItem,
  Select,
  Tooltip,
} from "@mui/material";
import {
  Edit,
  Share,
  Block,
  Language,
  Lock,
  ExitToApp,
  PostAdd,
  PhotoLibrary,
  People,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const [language, setLanguage] = useState("English");
  const [view, setView] = useState("profile");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [profileDetails, setProfileDetails] = useState({
    name: "Name",
    username: "username",
    bio: "bio",
    location: "Location",
    maritalStatus: "Single",
  });

  const navigate = useNavigate();

  const handleEditProfile = () => {
    setIsEditing(true);
    console.log("Edit Profile clicked");
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    console.log("Profile saved:", profileDetails);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleShareProfile = () => {
    console.log("Share Profile clicked");
  };

  const handleBlockedAccounts = () => {
    console.log("Blocked Accounts clicked");
  };

  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    setLanguage(selectedLanguage);
    console.log("Language changed to:", selectedLanguage);
  };

  const handleDeactivateAccount = () => {
    console.log("Deactivate Account clicked");
  };

  const handleChangePassword = () => {
    setView("changePassword");
    console.log("Change Password clicked");
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handlePosts = () => {
    setView("posts");
    console.log("Posts clicked");
  };

  const handleGallery = () => {
    setView("gallery");
    console.log("Gallery clicked");
  };

  const handleFriends = () => {
    setView("friends");
    console.log("Friends clicked");
  };

  const handleUpdatePassword = () => {
    // Add logic to update password
    console.log("Password updated:", { currentPassword, newPassword });
    // Reset the form and go back to profile view
    setCurrentPassword("");
    setNewPassword("");
    setView("profile");
  };

  return (
    <Container className="profile">
      <div className="profile-header">
        <Avatar
          src="profile-picture-url"
          alt="Profile"
          className="profile-picture"
          sx={{ width: 100, height: 100 }}
        />
        <Typography variant="h4">{profileDetails.name}</Typography>
        <Tooltip title="Edit Profile">
          <IconButton onClick={handleEditProfile}>
            <Edit />
          </IconButton>
        </Tooltip>
      </div>
      <div className="profile-navigation">
        <Tooltip title="Posts">
          <IconButton onClick={handlePosts}>
            <PostAdd />
          </IconButton>
        </Tooltip>
        <Tooltip title="Gallery">
          <IconButton onClick={handleGallery}>
            <PhotoLibrary />
          </IconButton>
        </Tooltip>
        <Tooltip title="Friends">
          <IconButton onClick={handleFriends}>
            <People />
          </IconButton>
        </Tooltip>
      </div>
      <div className="profile-content">
        {view === "profile" && (
          <>
            {isEditing ? (
              <div className="profile-edit-form">
                <TextField
                  label="Name"
                  name="name"
                  value={profileDetails.name}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Username"
                  name="username"
                  value={profileDetails.username}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Bio"
                  name="bio"
                  value={profileDetails.bio}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Location"
                  name="location"
                  value={profileDetails.location}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
                <Select
                  label="Marital Status"
                  name="maritalStatus"
                  value={profileDetails.maritalStatus}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                >
                  <MenuItem value="Single">Single</MenuItem>
                  <MenuItem value="Married">Married</MenuItem>
                  <MenuItem value="Divorced">Divorced</MenuItem>
                  <MenuItem value="Widowed">Widowed</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSaveProfile}
                >
                  Save
                </Button>
              </div>
            ) : (
              <>
                <div className="profile-section">
                  <Typography variant="h5">Share Profile</Typography>
                  <Tooltip title="Share Profile">
                    <IconButton onClick={handleShareProfile}>
                      <Share />
                    </IconButton>
                  </Tooltip>
                </div>
                <div className="profile-section">
                  <Typography variant="h5">Security and Activities</Typography>
                  <ul>
                    <li>
                      <Tooltip title="Blocked Accounts">
                        <IconButton onClick={handleBlockedAccounts}>
                          <Block />
                        </IconButton>
                      </Tooltip>
                      <Typography>Blocked Accounts</Typography>
                    </li>
                    <li>
                      <Language />
                      <Select
                        value={language}
                        onChange={handleLanguageChange}
                        className="profile-link"
                      >
                        <MenuItem value="English">English</MenuItem>
                        <MenuItem value="French">French</MenuItem>
                        <MenuItem value="Kinyarwanda">Kinyarwanda</MenuItem>
                      </Select>
                    </li>
                    <li>
                      <Tooltip title="Deactivate Account">
                        <IconButton onClick={handleDeactivateAccount}>
                          <Lock />
                        </IconButton>
                      </Tooltip>
                      <Typography>Deactivate Account</Typography>
                    </li>
                  </ul>
                </div>
              </>
            )}
          </>
        )}
        {view === "posts" && (
          <div className="profile-section">
            <Typography variant="h5">Posts</Typography>
            {/* Display user posts here */}
          </div>
        )}
        {view === "gallery" && (
          <div className="profile-section">
            <Typography variant="h5">Gallery</Typography>
            {/* Display user pictures and videos here */}
          </div>
        )}
        {view === "friends" && (
          <div className="profile-section">
            <Typography variant="h5">Friends list</Typography>
            {/* Display user friends here */}
          </div>
        )}
        {view === "messages" && (
          <div className="profile-section">
            <Typography variant="h5">Messages</Typography>
            {/* Display user messages here */}
          </div>
        )}
        {view === "changePassword" && (
          <div className="profile-sectionPassword">
            <Typography variant="h5">Change Password</Typography>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdatePassword();
              }}
            >
              <div>
                <TextField
                  label="Current Password"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                  fullWidth
                  margin="normal"
                />
              </div>
              <div>
                <TextField
                  label="New Password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  fullWidth
                  margin="normal"
                />
              </div>
              <Button type="submit" variant="contained" color="primary">
                Update Password
              </Button>
            </form>
          </div>
        )}
      </div>
      <div className="profile-actions-buttons">
        <Tooltip title="Change Password">
          <IconButton onClick={handleChangePassword}>
            <Lock />
          </IconButton>
        </Tooltip>
        <Tooltip title="Sign Out">
          <IconButton onClick={handleSignOut}>
            <ExitToApp />
          </IconButton>
        </Tooltip>
      </div>
    </Container>
  );
};

export default Profile;
