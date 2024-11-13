import React, { useState, useEffect } from 'react';
import { ResetPassword } from '../api/api';
import ReCAPTCHA from 'react-google-recaptcha';
import '../styles/login.scss';
import { useLocation, useNavigate } from 'react-router-dom';

const ResetPasswordView = () => {
    const [password, setPassword] = useState('');
    const [cpass, setCPass] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [captchaToken, setCaptchaToken] = useState('');
    const navigate = useNavigate();

    // Lấy token từ query parameters
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const resetToken = params.get('token');  // Lấy token từ URL query

    useEffect(() => {
        if (!resetToken) {
            setErrorMessage("Token không hợp lệ");
        }
    }, [resetToken]);

    const handleCaptchaChange = (token) => {
        setCaptchaToken(token);
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (!captchaToken) {
            setErrorMessage('Vui lòng xác nhận CAPTCHA.');
            return;
        }
        if (!resetToken) {
            setErrorMessage('Token không hợp lệ.');
            return;
        }

        try {
            // Gọi API thay đổi mật khẩu với resetToken, newPassword và confirmPassword
            const response = await ResetPassword(password, cpass, resetToken, captchaToken);
            console.log('Change Password successful:', response);
            navigate('/login');
        } catch (error) {
            console.error('Change Password failed:', error);
            setErrorMessage(error.message || 'Change Password Failed');
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-left">
                    <img src={require('../assets/images/logo.png')} alt="Logo" className="logo" />
                    <h2>Forgot Password</h2>
                    <p>Make Your Password Stronger</p>
                    <form onSubmit={handleResetPassword}>
                        <div className="form-group">
                            <label htmlFor="cpass">New Password</label>
                            <input
                                type="text"
                                id="cpass"
                                placeholder="xxxx"
                                value={cpass}
                                onChange={(e) => setCPass(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Confirm Password</label>
                            <input
                                type="text"
                                id="password"
                                placeholder="xxxx"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <ReCAPTCHA
                            sitekey="6LdsR3AqAAAAAIGtNzZDDXM7TriFXWOc1XeOlTnq" // Đã thay bằng site key của bạn
                            onChange={handleCaptchaChange}
                        />
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                        <div className="form-options">
                            <a href="/login" className="forgot-password">Sign in</a>
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

export default ResetPasswordView;
