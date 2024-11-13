import React from 'react';
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

// Các component chung như Header, Footer
import Header from '../components/Header';
import Footer from '../components/Footer';

const Layout = ({ children }) => (
  <div id="layout">
    <Header />
    <div id="content">
      {children}
    </div>
    <Footer />
  </div>
);

const App = () => {
  return (
    <div id="main">
      <Router>
        <Routes>
          {/* Các Route có Footer và Header chung */}
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/albums" element={<Layout><Album /></Layout>} />
          <Route path="/library" element={<Layout><Library /></Layout>} />
          <Route path="/artist" element={<Layout><Artist /></Layout>} />
          <Route path="/profile" element={<Layout><Profile /></Layout>} />
          <Route path="/change-password" element={<Layout><ChangePasswordView /></Layout>} />
          <Route path="/subcribe" element={<Layout><Subcribe /></Layout>} />
          <Route path="/payment" element={<Layout><Payment /></Layout>} />
          <Route path="/song-detail/:id" element={<Layout><SongDetail /></Layout>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
