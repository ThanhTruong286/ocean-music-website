import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser as apiRegisterUser } from '../api/api'; // Đổi tên ở đây
import '../styles/Register.scss';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }
    setErrorMessage('');

    const userData = {
      firstName,
      lastName,
      email,
      password,
      phone,
    };

    try {
      const response = await apiRegisterUser(userData); // Sử dụng tên mới ở đây
      console.log(response.message);
      // Bạn có thể chuyển hướng người dùng đến trang đăng nhập hoặc trang khác ở đây
    } catch (error) {
      setErrorMessage('Registration failed. Please try again.');
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-left">
          <img src={require('../assets/images/logo.png')} alt="Logo" className="logo" />
          <h2>Sign Up</h2>
          <p>Create your account to get started.</p>
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                placeholder="John"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                placeholder="Doe"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
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
              <label htmlFor="phone">Phone No.</label>
              <input
                type="text"
                id="phone"
                placeholder="123456789"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
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
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="xxxx"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div className="form-options">
              <div>
                <input type="checkbox" id="terms" required />
                <label htmlFor="terms"> I agree with the terms of use</label>
              </div>
            </div>
            <button type="submit" className="register-button">Sign Up</button>
          </form>
          <p className="or-sign-up">or sign up with other accounts?</p>
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
          <p className="login-text">
            Already have an account? <a href="#">Sign In</a>
          </p>
        </div>
        <div className="register-right">
          <div className="register-info"></div>
        </div>
      </div>
    </div>
  );
};

export default Register; // Đảm bảo câu lệnh này nằm ở cuối file
