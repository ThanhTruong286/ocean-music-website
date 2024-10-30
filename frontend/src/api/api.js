import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Change Password
export const ChangePassword = async (currentPassword, newPassword) => {
    if (!currentPassword || !newPassword) {
        throw new Error('Mật khẩu không được để trống.');
    }

    try {
        const userId = localStorage.getItem('user');

        if (!userId) {
            throw new Error('User không hợp lệ. Vui lòng đăng nhập lại.');
        }

        const response = await axios.put(
            `${API_URL}/auth/change-password`,
            { currentPassword, newPassword, userId },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );

        console.log('Thay đổi mật khẩu thành công:', response.data);
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Thay đổi mật khẩu thất bại';
        console.error('Thay đổi mật khẩu thất bại:', errorMessage);
        throw new Error(errorMessage);
    }
};

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

// Fetch all songs
export const fetchSongs = async () => {
    try {
        const response = await axios.get(`${API_URL}/songs`);
        return response.data;
    } catch (error) {
        console.error('Error fetching songs:', error);
        throw error;
    }
};

// Fetch all roles
export const fetchRoles = async () => {
    try {
        const response = await axios.get(`${API_URL}/roles`);
        return response.data;
    } catch (error) {
        console.error('Error fetching roles:', error);
        throw error;
    }
};

export const getUser = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user.userId;
    try {
        const response = await axios.get(`${API_URL}/users/profile/${userId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('userToken')}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error sending user ID:', error);
        throw error;
    }
};

export const loginUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, userData, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const { token, expiry, userId } = response.data;

        localStorage.setItem('user', JSON.stringify({ userId, expiry }));
        localStorage.setItem('userToken', JSON.stringify({ token }));

        return response.data;
    } catch (error) {
        console.error('Login failed:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const getUserData = () => {
    const userDataWithExpiry = JSON.parse(localStorage.getItem('user'));

    if (!userDataWithExpiry) {
        return null;
    }

    const now = new Date().getTime();

    if (now > userDataWithExpiry.expiry) {
        localStorage.removeItem('user');
        return null;
    }

    return userDataWithExpiry.data;
};

export const logoutUser = async () => {
    try {
        await axios.post(`${API_URL}/auth/logout`, {}, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        localStorage.removeItem('user');
        localStorage.removeItem('userToken');

        window.location.href = '/login';
    } catch (error) {
        console.error('Logout failed:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const registerUser = async (userData) => {
    try {
        console.log(userData);
        const response = await axios.post(`${API_URL}/auth/register`, userData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};

export const fetchGenres = async () => {
    try {
        const response = await axios.get(`${API_URL}/genres`);
        return response.data;
    } catch (e) {
        console.error('Error fetching genres: ', e);
        throw e;
    }
};

export const fetchPlaylists = async () => {
    try {
        const response = await axios.get(`${API_URL}/playlist`);
        return response.data;
    } catch (e) {
        throw e;
    }
};

export const fetchingSongs = async () => {
    try {
        const res = await axios.get(`${API_URL}/song`);
        return res.data;
    } catch (e) {
        throw e;
    }
};
