import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

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
        const response = await axios.get(`${API_URL}/songs`); // Update the URL to fetch songs directly
        return response.data;
    } catch (error) {
        console.error('Error fetching songs:', error);
        throw error;
    }
};



