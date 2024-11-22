import React, { useState, useEffect } from 'react';
import { ResetPassword } from '../api/api';  // Import API ResetPassword
import ReCAPTCHA from 'react-google-recaptcha';
import '../styles/login.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';  // Import SweetAlert2

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

    // Hàm xử lý thay đổi CAPTCHA
    const handleCaptchaChange = (token) => {
        setCaptchaToken(token);
    };

    // Hàm xử lý reset mật khẩu
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

        if (password !== cpass) {
            setErrorMessage('Mật khẩu xác nhận không khớp.');
            return;
        }

        try {
            // Gọi API reset mật khẩu
            const response = await ResetPassword(password, cpass, resetToken, captchaToken);
            console.log('Reset Password successful:', response);

            // Hiển thị thông báo thành công
            Swal.fire({
                icon: 'success',
                title: 'Đặt lại mật khẩu thành công!',
                text: 'Mật khẩu của bạn đã được thay đổi. Vui lòng đăng nhập lại.',
                confirmButtonText: 'OK'
            });

            // Chuyển hướng đến trang đăng nhập
            navigate('/login');
        } catch (error) {
            console.error('Reset Password failed:', error);

            // Hiển thị thông báo lỗi
            Swal.fire({
                icon: 'error',
                title: 'Đã có lỗi xảy ra!',
                text: error.message || 'Không thể thay đổi mật khẩu.',
                confirmButtonText: 'Thử lại'
            });

            setErrorMessage(error.message || 'Không thể thay đổi mật khẩu.');
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-left">
                    <img src={require('../assets/images/logo.png')} alt="Logo" className="logo" />
                    <h2>Quên Mật Khẩu</h2>
                    <p>Sử dụng mật khẩu mạnh vào bạn nhé !!!</p>
                    <form onSubmit={handleResetPassword}>
                        <div className="form-group">
                            <label htmlFor="cpass">Mật khẩu mới</label>
                            <input
                                type="password"
                                id="cpass"
                                placeholder="Nhập mật khẩu mới"
                                value={cpass}
                                onChange={(e) => setCPass(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Xác nhận mật khẩu</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Xác nhận mật khẩu"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <ReCAPTCHA
                            sitekey="6LdsR3AqAAAAAIGtNzZDDXM7TriFXWOc1XeOlTnq" // Thay bằng site key của bạn
                            onChange={handleCaptchaChange}
                        />
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                        <div className="form-options">
                            <a href="/login" className="forgot-password">Đăng nhập</a>
                        </div>
                        <button type="submit" className="login-button">Đồng ý</button>
                    </form>
                    <p className="or-sign-in">Đăng nhập bằng tài khoản khác</p>
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
                        Không có tài khoản ? <a href="/register">Đăng ký ở đây</a>
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
