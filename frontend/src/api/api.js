import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const fetchArtists = async () => {
    try {
        const response = await axios.get(`${API_URL}/artist`);
        return response.data; // Trả về dữ liệu từ server
    } catch (error) {
        console.error('Error fetching artists:', error);
        throw error; // Ném lỗi lên để xử lý sau này
    }
};
