// ResetPassword.js
import React, { useState } from 'react';
import { requestPasswordReset } from '../api/api';
import ReCAPTCHA from 'react-google-recaptcha';
import '../styles/login.scss';
import { useNavigate } from 'react-router-dom';
import { SendEmail } from '../api/api';

const EmailBackup = () => {
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [captchaToken, setCaptchaToken] = useState('');
    const navigate = useNavigate();

    const handleCaptchaChange = (token) => {
        setCaptchaToken(token);
    };

    const handleRequestPasswordReset = async (e) => {
        e.preventDefault();
        if (!captchaToken) {
            setErrorMessage('Vui lòng xác nhận CAPTCHA.');
            return;
        }
        
        try {
            // Call API to request password reset
            const response = await SendEmail(email);
            console.log('Password reset request successful:', response);
            // navigate('/otp-check');
        } catch (error) {
            console.error('Password reset request failed:', error);
            setErrorMessage(error.message || 'Yêu cầu đặt lại mật khẩu thất bại.');
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-left">
                    <img src={require('../assets/images/logo.png')} alt="Logo" className="logo" />
                    <h2>Send Email OTP</h2>
                    <p>Enter your email to receive reset link</p>
                    <form onSubmit={handleRequestPasswordReset}>
                        <div className="form-group">
                            <label htmlFor="email">Email đăng nhập</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Email của bạn"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <ReCAPTCHA
                            sitekey="6LdsR3AqAAAAAIGtNzZDDXM7TriFXWOc1XeOlTnq"
                            onChange={handleCaptchaChange}
                        />
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                        <button type="submit" className="login-button">Submit</button>
                    </form>
                    <p className="signup-text">
                        Don’t have an account? <a href="/register">Click here to sign up.</a>
                    </p>
                </div>
                <div className="login-right">
                    <div className="login-info"></div>
                </div>
            </div>
        </div>
    );
};

export default EmailBackup;
