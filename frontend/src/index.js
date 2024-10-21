import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from "./views/Home";
import reportWebVitals from './reportWebVitals';
import './styles/global.scss';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './views/Login';
import Register from './views/Register';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
      <Login />  {/* Render App bên trong Router */}
    </Router>
  </React.StrictMode>
);

reportWebVitals();
