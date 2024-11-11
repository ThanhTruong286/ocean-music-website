import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SpotifyCallback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleSpotifyCallback = async () => {
            const params = new URLSearchParams(window.location.search);
            const code = params.get('code');

            if (code) {
                try {
                    // Gửi mã code đến backend để lấy access token
                    const response = await axios.get('http://localhost:5000/api/auth/login/callback', {
                        params: { code },
                    });

                    const { access_token } = response.data;

                    // Lưu access token vào localStorage
                    localStorage.setItem('spotifyToken', access_token);

                    // Điều hướng về trang home ('/')
                    navigate('/');
                } catch (error) {
                    console.error('Spotify callback failed:', error);
                    // Điều hướng đến trang lỗi nếu có lỗi
                    navigate('/');
                }
            } else {
                console.error('No code found in the URL!');
                // Điều hướng đến trang lỗi nếu không có mã code
                navigate('/');
            }
        };

        handleSpotifyCallback();
    }, [navigate]);

    return <div>Redirecting...</div>;
};

export default SpotifyCallback;
