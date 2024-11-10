import React, { useState } from 'react';
import { getSpotifyLoginUrl } from '../api/api';
import { useNavigate } from 'react-router-dom';
import '../styles/login.scss';

const Login = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSpotifyLogin = async () => {
        try {
            const loginUrl = await getSpotifyLoginUrl();
            window.location.href = loginUrl;  // Chuyển hướng người dùng đến Spotify để đăng nhập
        } catch (error) {
            setErrorMessage('Failed to redirect to Spotify login.');
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-left">
                    <img src={require('../assets/images/logo.png')} alt="Logo" className="logo" />
                    <h2>Sign In with Spotify</h2>
                    <p>Login to stay connected.</p>

                    {errorMessage && <p className="error-message">{errorMessage}</p>}

                    <button onClick={handleSpotifyLogin} className="login-button spotify-button">
                        <i className="fab fa-spotify"></i> Sign in with Spotify
                    </button>

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

export default Login;
