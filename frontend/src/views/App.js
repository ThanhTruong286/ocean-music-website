import './App.scss';
import Home from './Home';
import Login from './Login';
import Footer from '../components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 

const App = () => {
  return (
    <div id='main'>
      <Router>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;
