import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

//Xử lý thanh toán momo
export const MoMoPayment = async (price, userPlan) => {
    try {
        // Lấy userId từ localStorage
        const user = JSON.parse(localStorage.getItem('user'));
        const userId = user.userId;

        // Kiểm tra xem userId có tồn tại không
        if (!userId) {
            console.log("User ID không được tìm thấy trong localStorage.");
            return;
        }

        const response = await axios.post(`${API_URL}/payment/momo`,
            {
                amount: price,
                orderInfo: "Thanh toán qua MoMo",
                userId: userId,
                userPlan: userPlan
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            });

        const result = response.data;
        console.log(result);
        if (result && result.payUrl) {
            window.location.href = result.payUrl; // Chuyển hướng tới payUrl
        } else {
            console.log("Lỗi khi khởi tạo thanh toán.");
        }
    } catch (error) {
        console.error("Lỗi khi gọi API:", error);
    }
}
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Fetch all artists
export const fetchArtists = async (accessToken) => {
    try {
        const response = await fetch('https://api.spotify.com/v1/browse/featured-playlists', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            throw new Error('Lỗi khi lấy playlist nổi bật');
        }

        const data = await response.json();
        return data.playlists.items; // Trả về danh sách các playlist
    } catch (error) {
        console.error('Error fetching featured playlists:', error);
        throw error;
    }
};

// Fetch all albums
export const fetchAlbums = async () => {
    try {
        const response = await axios.get(`${API_URL}/album`);
        return response.data;
    } catch (error) {
        console.error('Error fetching albums:', error);
        throw error;
    }
};

export const fetchEpisodes = async (accessToken) => {
    try {
        const showIds = [
            '4wgngegSJN8a3635TJafKV', // ID của show podcast hợp lệ
        ];

        // Lấy episodes cho mỗi showId
        const requests = showIds.map((showId) =>
            axios.get(`https://api.spotify.com/v1/shows/${showId}/episodes`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
        );

        // Chờ tất cả các request và kết hợp các episode vào một mảng
        const responses = await Promise.all(requests);
        const episodes = responses.flatMap((response) => response.data.items || []); // flatMap để ghép tất cả các items thành một mảng duy nhất

        console.log(episodes);  // Để kiểm tra xem dữ liệu trả về có đúng không
        return episodes;
    } catch (error) {
        console.error("Lỗi khi lấy gợi ý episodes:", error.response?.data || error.message);
        return [];
    }
};

export const fetchFollowingArtists = async (accessToken) => {
    try {
        const response = await axios.get('https://api.spotify.com/v1/me/following?type=artist', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data; // Trả về dữ liệu của nghệ sĩ đang theo dõi
    } catch (error) {
        throw error; // Nếu có lỗi, ném ra
    }
};

export const getSpotifyLoginUrl = () => {
    const clientId = 'c0fde7148f22431abf3454b1e3d5250b';
    const redirectUri = 'http://localhost:3000/callback';
    const scopes = [
        'user-read-private',
        'user-read-email',
        'user-library-read',
        'playlist-read-private',
        'playlist-read-collaborative',
        'user-top-read',
        'user-follow-read',
        'user-read-playback-state',
        'user-modify-playback-state',
        'app-remote-control',
        'streaming',
        'playlist-modify-public',
        'playlist-modify-private',
        'user-read-recently-played'
    ].join(' ');
    // Tạo chuỗi các scopes với khoảng trắng phân cách

    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}`;
    return authUrl;
};

export const fetchSpotifyUser = async (accessToken) => {
    try {
        const response = await fetch('https://api.spotify.com/v1/me', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error fetching user profile:', errorText);
            throw new Error('Failed to fetch user profile');
        }

        const data = await response.json();

        if (data) {
            return data;
        } else {
            console.error('Display name not found in user profile data');
            return 'Unknown User';
        }

    } catch (error) {
        console.error('Error fetching user profile:', error);
        throw error;
    }
};

export const fetchTopGenres = async (accessToken) => {
    try {
        const response = await fetch('https://api.spotify.com/v1/recommendations/available-genre-seeds', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error fetching genres:', response.status, errorText);
            throw new Error('Failed to fetch genres');
        }

        const data = await response.json();
        return data.genres; // Trả về danh sách thể loại nhạc

    } catch (error) {
        console.error('Error in fetchGenres:', error);
        throw error;
    }
};

export const fetchPlaylists = async (accessToken) => {
    try {
        const response = await axios.get('https://api.spotify.com/v1/browse/featured-playlists', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            params: {
                limit: 10, // Số lượng playlist muốn lấy
            },
        });
        return response.data.playlists.items; // Trả về danh sách playlist
    } catch (error) {
        console.error('Error fetching playlists:', error);
        throw error;
    }
};

export const fetchTrendingSongs = async (accessToken) => {
    try {
        const response = await axios.get('https://api.spotify.com/v1/me/top/tracks', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            params: {
                limit: 20,  // Số lượng bài hát muốn lấy
                time_range: 'short_term',  // 'short_term', 'medium_term', 'long_term'
            },
        });
        return response.data.items;  // trả về danh sách các bài hát
    } catch (error) {
        console.error('Error fetching trending songs:', error);
        throw error;
    }
};

export const fetchRecentlyPlayed = async (accessToken) => {
    try {
        const response = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=10', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error fetching recently played songs:', response.status, errorText);
            throw new Error('Failed to fetch recently played songs');
        }

        const data = await response.json();
        return data.items;
    } catch (error) {
        console.error('Error in fetchRecentlyPlayed:', error);
        throw error;
    }
};


