import React, { useEffect } from 'react';
import '../styles/App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import các trang
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Album from './Album';
import Library from './Library';
import Artist from './Artist';
import Profile from './Profile';
import Subcribe from './Subcribe';
import ChangePasswordView from './ChangePassword';
import Payment from './Payment';
import SongDetail from './SongDetail';
import GeneralSetting from './GeneralSetting';
import Chart from './chart';
import SettingProfile from './SettingProfile';
// Import Footer nếu bạn vẫn muốn hiển thị nó trên mọi trang
import Footer from '../components/Footer';

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
          <Route path="/library" element={<Library />} />
          <Route path="/artist" element={<Artist />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/change-password" element={<ChangePasswordView />} />
          <Route path="/subcribe" element={<Subcribe />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/song-detail/:id" element={<SongDetail />} />
          <Route path="/general-setting" element={<GeneralSetting />} />
          <Route path="/chart" element={<Chart />} />
          <Route path="/setting-profile" element={<SettingProfile />} />

        </Routes>
        <Footer /> {/* Nếu muốn Footer xuất hiện ở mọi trang */}
      </Router>
    </div>
  );
}

export default App;
