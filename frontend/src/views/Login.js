import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/api'; // Đảm bảo rằng đường dẫn này chính xác
import '../styles/Login.scss';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const userData = { email, password };

    try {
      const response = await loginUser(userData);
      console.log('Đăng nhập thành công:', response);

      localStorage.setItem('token', response.token);
      localStorage.setItem('userId', response.userId);

      navigate('/home');
      setErrorMessage('Đăng nhập thành công. Siuuuuuuuuuuuuu');
    } catch (error) {
      console.error('Lỗi khi đăng nhập:', error);
      setErrorMessage('Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-left">
          <img src={require('../assets/images/logo.png')} alt="Logo" className="logo" />
          <h2>Sign In</h2>
          <p>Login to stay connected.</p>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                placeholder="xyz@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                id="password" 
                placeholder="xxxx" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div className="form-options">
              <div>
                <input type="checkbox" id="remember" />
                <label htmlFor="remember"> Remember Me</label>
              </div>
              <a href="#" className="forgot-password">Forgot Password?</a>
            </div>
            <button type="submit" className="login-button">Sign In</button>
          </form>
          <p className="or-sign-in">or sign in with other accounts?</p>
          <div className="social-login">
            <button className="social-button google">
              <i className="fab fa-google"></i>
            </button>
            <button className="social-button facebook">
              <i className="fab fa-facebook-f"></i>
            </button>
            <button className="social-button instagram">
              <i className="fab fa-instagram"></i>
            </button>
            <button className="social-button linkedin">
              <i className="fab fa-linkedin-in"></i>
            </button>
          </div>
          <p className="signup-text">
            Don’t have an account? <a href="#">Click here to sign up.</a>
          </p>
        </div>
        <div className="login-right">
          <div className="login-info">
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
