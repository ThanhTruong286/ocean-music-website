import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/api'; // Đảm bảo rằng đường dẫn này chính xác
import '../styles/Login.scss';
import axios from 'axios';

const Login = () => { 
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); 

    const handleLogin = async (e) => {
        e.preventDefault();

        // Chuẩn bị dữ liệu đăng nhập
        const userData = { email, password }; 

        try {
            // Gửi yêu cầu đăng nhập
            const response = await loginUser(userData); 
            console.log('Login successful:', response);
            // Điều hướng đến trang khác nếu đăng nhập thành công
        } catch (error) {
            console.error('Login failed:', error);
            setErrorMessage(error.response?.data?.message || 'Invalid email or password.'); 
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
