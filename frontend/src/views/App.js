import './App.scss';
import Home from './Home';
import Login from './Login';
import Register from "./Register";
import Album from "./Album";
import Library from './Library';
import Artist from './Artist';
import Profile from './Profile';
import ChangePasswordView from './ChangePassword';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ResetPasswordView from './ResetPassword';
import EmailBackup from "./Email";

const App = () => {
  return (
    <div id='main'>
      <Router>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/albums' element={<Album />} />
          <Route path='/library' element={<Library />} />
          <Route path='/artist' element={<Artist />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/change-password' element={<ChangePasswordView />} />
          <Route path='/reset-password' element={<ResetPasswordView />} />
          <Route path='/email' element={<EmailBackup />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;
