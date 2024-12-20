import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AudioProvider } from '../context/AudioContext';  // Import AudioProvider

// Import các trang
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Album from './Album';
import Artist from './Artist';
import Profile from './Profile';
import Subcribe from './Subcribe';
import ChangePasswordView from './ChangePassword';
import Payment from './Payment';
import SongDetail from './SongDetail';
import Playlist from './Playlist';
import PlaylistDetail from './PlaylistDetail';
import GeneralSetting from './GeneralSetting';
import Chart from './Chart';
import SettingProfile from './SettingProfile';
import Footer from '../components/Footer';
import ArtistDetail from "./ArtistDetail";
import AlbumDetail from "./AlbumDetail";
import ArtistSong from './ArtistSong';
import ChatBot from './ChatBot';
import Help from "./Help";
import ResetPassword from "./ResetPassword";
import Email from "./Email";
import Dashboard from "./Dashboard";
import Ticket from './Ticket';
import { TopicProvider } from '../context/TopicContext';
import UserTicket from "./UserTicket"

const App = () => {
  useEffect(() => {
    // Lấy trạng thái dark mode từ localStorage
    const isDarkMode = JSON.parse(localStorage.getItem('isDarkMode'));
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, []); // Chạy một lần khi ứng dụng khởi động

  return (
    <div id="main">
      <TopicProvider>
      <AudioProvider>
        <Router>
          <Routes>
            {/* Các Route không có Header và Footer */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/send-email" element={<Email />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/albums" element={<Album />} />
            <Route path="/albums/:id" element={<AlbumDetail />} />
            <Route path="/artist" element={<Artist />} />
            <Route path="/artist/:id" element={<ArtistDetail />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/change-password" element={<ChangePasswordView />} />
            <Route path="/subcribe" element={<Subcribe />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/song-detail/:id" element={<SongDetail />} />
            <Route path="/playlist" element={<Playlist />} />
            <Route path="/playlist/:id" element={<PlaylistDetail />} />
            <Route path="/general-setting" element={<GeneralSetting />} />
            <Route path="/chart" element={<Chart />} />
            <Route path="/setting-profile" element={<SettingProfile />} />
            <Route path="/songs" element={<ArtistSong />} />
            <Route path="/help" element={<Help />} />
            <Route path="/chatbot" element={<ChatBot />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/make-ticket" element={<Ticket />} />
            <Route path="/user-ticket" element={<UserTicket />} />
          </Routes>

          {/* Footer luôn hiển thị và không bị render lại khi chuyển trang */}
          <Footer />
        </Router>
      </AudioProvider>
      </TopicProvider>
    </div>
  );
}

export default App;
