import React, { useEffect } from 'react';
import '../styles/App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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
      <Router>
        <Routes>
          {/* Các Route không có Header và Footer */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/albums" element={<Album />} />
          <Route path="/artist" element={<Artist />} />
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
        </Routes>
      </Router>
    </div>
  );
}

export default App;
