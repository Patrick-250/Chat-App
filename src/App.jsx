// src/App.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Feed from "./components/Feed/Feed";
import Chat from "./components/Chat/Chat";
import Profile from "./components/Profile/Profile";
import Notifications from "./components/Notifications/Notifications";

const App = () => {
  const location = useLocation();
  const showHeader = location.pathname !== "/chat";

  return (
    <div className="App">
      {showHeader && <Header />}
      <div className="main-content">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/chat" element={<Chat />} /> {/* Add this line */}
            <Route path="/chat/:user" element={<Chat />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
