import '../styles/App.scss';
import Home from './Home';
import Login from './Login';
import Album from "./Album";
import Library from './Library';
import Artist from './Artist';
import Profile from './Profile';
import Subcribe from './Subcribe';
import Payment from './Payment';
import Admin from './Admin';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SpotifyCallback from './SpotifyCallback';

const App = () => {
  return (
    <div id='main'>
      <Router>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path="/callback" element={<SpotifyCallback />} />
          <Route path="/" element={<Home />} />
          <Route path='/albums' element={<Album />} />
          <Route path='/library' element={<Library />} />
          <Route path='/artist' element={<Artist />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/subcribe' element={<Subcribe />} />
          <Route path='/payment' element={<Payment />} />
          <Route path='/admin' element={<Admin />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;
