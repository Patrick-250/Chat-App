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
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";

const App = () => {
  const location = useLocation();
  const showHeaderAndSidebar = !["/login", "/register"].includes(
    location.pathname.toLowerCase()
  );

  return (
    <div className="App">
      {showHeaderAndSidebar && <Header />}
      <div className="main-content">
        {showHeaderAndSidebar && <Sidebar />}
        <div className="content">
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/chat/:user" element={<Chat />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
