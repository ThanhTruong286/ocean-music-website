import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import '../styles/login.scss';
import { useNavigate } from 'react-router-dom';
import { SendEmail } from '../api/api';
import Swal from 'sweetalert2';  // Import SweetAlert2

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

            // Hiển thị thông báo thành công bằng SweetAlert2
            Swal.fire({
                icon: 'success',
                title: 'Gửi mail thành công!',
                text: 'Vui lòng kiểm tra email của bạn để đặt lại mật khẩu.',
                confirmButtonText: 'OK'
            });
        } catch (error) {
            console.error('Password reset request failed:', error);

            // Hiển thị thông báo lỗi bằng SweetAlert2
            Swal.fire({
                icon: 'error',
                title: 'Đã có lỗi xảy ra!',
                text: error.message || 'Yêu cầu đặt lại mật khẩu thất bại.',
                confirmButtonText: 'Thử lại'
            });

            setErrorMessage(error.message || 'Yêu cầu đặt lại mật khẩu thất bại.');
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-left">
                    <img src={require('../assets/images/logo.png')} alt="Logo" className="logo" />
                    <h2>Gửi Email OTP</h2>
                    <p>Vui lòng nhập email mà bạn đã đăng ký trước đó</p>
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
                        <button type="submit" className="login-button">Gửi</button>
                    </form>
                    <p className="signup-text">
                        Không có tài khoản ? <a href="/register">Đăng ký ở đây</a>
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
