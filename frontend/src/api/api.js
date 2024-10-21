// api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const fetchArtists = async () => {
    try {
        const response = await axios.post(`${API_URL}/artist`);
        return response.data; // Trả về dữ liệu từ server
    } catch (error) {
        console.error('Error fetching artists:', error);
        throw error; // Ném lỗi lên để xử lý sau này
    }
};

export const loginUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, userData,userData, {
            headers: {
                'Content-Type': 'application/json'
            }}); // Đảm bảo đường dẫn là đúng
        return response.data; // Trả về dữ liệu từ server
    } catch (error) {
        console.error('Error logging in:', error); // In ra lỗi để kiểm tra
        throw error; // Ném lỗi lên để xử lý trong thành phần gọi hàm
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
