// api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Đảm bảo rằng URL này đúng

export const fetchArtists = async () => {
    try {
        const response = await axios.get(`${API_URL}/artist`);
        return response.data; // Trả về dữ liệu từ server
    } catch (error) {
        console.error('Error fetching artists:', error);
        throw error; // Ném lỗi lên để xử lý sau này
    }
};

export const profileViewData = async () => {
    try {
        const response = await axios.get(`${API_URL}/profile`);
        return response.data;
    } catch (e) {
        throw e;
    }
}

export const loginUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, userData, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        // Lưu thông tin người dùng vào localStorage (hoặc sessionStorage)
        localStorage.setItem('user', JSON.stringify(response.data));

        return response.data;
    } catch (error) {
        console.error('Login failed:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const logoutUser = async () => {
    try {
        // Gọi API backend để thực hiện đăng xuất (nếu cần)
        await axios.post(`${API_URL}/auth/logout`, {}, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        // Xóa token lưu trữ trên client (localStorage/sessionStorage)
        localStorage.removeItem('token'); // Hoặc sessionStorage
        console.log('Logout successful');

        // Chuyển hướng người dùng về trang đăng nhập hoặc trang chủ
        window.location.href = '/login';
    } catch (error) {
        console.error('Logout failed:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/auth/register`, userData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data; // Trả về dữ liệu từ server
    } catch (error) {
        console.error('Error registering user:', error);
        throw error; // Ném lỗi lên để xử lý trong thành phần gọi hàm
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
}
export const fetchingSongs = async () => {
    try {
        const res = await axios.get(`${API_URL}/song`);
        return res.data;
    } catch (e) {
        throw e;
    }
}

