import React, { useState } from 'react';
import { ChangePassword } from '../api/api';
import '../styles/login.scss';
import { useNavigate } from 'react-router-dom';

const ChangePasswordView = () => {
    const [cpass, setCPass] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleChangePassword = async (e) => {
        e.preventDefault();
        try {
            // Gửi yêu cầu đăng nhập
            const response = await ChangePassword(cpass, password);
            console.log('Change Password successful:', response);
            navigate('/login');
        } catch (error) {
            console.error('Change Password failed:', error);
            setErrorMessage(error.response?.data?.message || 'Change Password Failed:', error);
        }
    };


    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-left">
                    <img src={require('../assets/images/logo.png')} alt="Logo" className="logo" />
                    <h2>Change Password</h2>
                    <p>Make Your Password Stronger</p>
                    <form onSubmit={handleChangePassword}>
                        <div className="form-group">
                            <label htmlFor="cpass">Current Password</label>
                            <input
                                type="text"
                                id="text"
                                placeholder="xxxx"
                                value={cpass}
                                onChange={(e) => setCPass(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">New Password</label>
                            <input
                                type="text"
                                id="password"
                                placeholder="xxxx"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                        <div className="form-options">
                            <a href="#" className="forgot-password">Forgot Password?</a>
                        </div>
                        <button type="submit" className="login-button">Submit</button>
                    </form>
                    <p className="or-sign-in">Sign in with other accounts?</p>
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
                        Don’t have an account? <a href="/register">Click here to sign up.</a>
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

export default ChangePasswordView;
