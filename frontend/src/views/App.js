import React from 'react';
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

const App = () => {
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
        </Routes>
      </Router>
    </div>
  );
}

export default App;