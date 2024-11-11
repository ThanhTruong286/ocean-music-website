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

// Fetch all artists
export const fetchArtists = async () => {
    try {
        const response = await axios.get(`${API_URL}/artist`);
        return response.data;
    } catch (error) {
        console.error('Error fetching artists:', error);
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

// Lấy tất cả các bài hát yêu thích
export const fetchFavorites = async () => {
    try {
        const response = await axios.get(`${API_URL}/favorites`);
        return response.data;
    } catch (error) {
        console.error('Error fetching favorites:', error);
        throw error;
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
        // Lấy danh sách nghệ sĩ yêu thích
        const response = await fetch('https://api.spotify.com/v1/me/top/artists', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            const errorText = await response.text(); // Lấy thêm thông tin lỗi từ phản hồi
            console.error('Error fetching artists:', response.status, errorText);
            throw new Error('Failed to fetch artists');
        }

        const data = await response.json();
        console.log('Artist data:', data);

        const artistId = data.items[0]?.id;
        const artistName = data.items[0]?.name;

        if (artistId) {
            console.log(`Fetching albums for artist: ${artistName}`);

            // Lấy danh sách album của nghệ sĩ
            const playlistsResponse = await fetch(`https://api.spotify.com/v1/artists/${artistId}/albums`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                }
            });

            if (!playlistsResponse.ok) {
                const playlistsErrorText = await playlistsResponse.text();
                console.error('Error fetching playlists:', playlistsResponse.status, playlistsErrorText);
                throw new Error('Failed to fetch playlists');
            }

            const playlistsData = await playlistsResponse.json();

            return playlistsData.items; // Trả về danh sách album

        } else {
            console.error('No artist found');
            throw new Error('No artist found');
        }

    } catch (error) {
        console.error('Error in fetchPlaylists:', error);
        throw error;
    }
};

export const fetchTrendingSongs = async (accessToken) => {
    try {
        // Gọi API để lấy danh sách album mới (trending)
        const response = await fetch('https://api.spotify.com/v1/browse/new-releases', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });

        // Kiểm tra nếu có lỗi
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error fetching trending songs:', response.status, errorText);
            throw new Error('Failed to fetch trending songs');
        }

        // Parse kết quả trả về dưới dạng JSON
        const data = await response.json();
        // Trả về danh sách các album và bài hát
        return data.albums.items; // Trả về danh sách album mới
    } catch (error) {
        console.error('Error in fetchTrendingSongs:', error);
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


