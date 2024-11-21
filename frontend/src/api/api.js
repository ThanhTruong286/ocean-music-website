import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getOwnSong = async () => {
    const accessToken = localStorage.getItem('userToken');

    if (!accessToken) {
        throw new Error('No access token found');
    }
    try {
        const response = await axios.get(`${API_URL}/song/own-song`, 
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            })
        return response.data;
    } catch (e) {
        throw new Error(`Error adding song to playlist: ${e.message}`)
    }
}

export const getAlbumById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/album/${id}`);
        return response.data;
    } catch (e) {
        throw new Error("error get album by id", e);
    }
}
export const getArtistAlbums = async (userId) => {
    try {
        const accessToken = localStorage.getItem('userToken');

        if (!accessToken) {
            console.log("User ID không được tìm thấy trong localStorage.");
            return;
        }
        const response = await axios.get(`${API_URL}/artist/${userId}/albums`)
        if (response) {
            return response.data;
        }
    } catch (e) {
        throw new Error("Error get artist album");
    }
}
export const ZaloPayment = async (price, userPlan) => {
    try {
        // Lấy userId từ localStorage
        const accessToken = localStorage.getItem('userToken');

        // Kiểm tra xem userId có tồn tại không
        if (!accessToken) {
            console.log("User ID không được tìm thấy trong localStorage.");
            return;
        }

        const response = await axios.post(`${API_URL}/payment/zalopay`,
            {
                amount: price,
                orderInfo: "Thanh toán qua Zalo Pay",
                userPlan: userPlan
            },
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            }
        )

        const result = response.data;
        console.log(result);
        if (result && result.order_url) {
            window.location.href = result.order_url; //chuyen huong toi trang thanh toan
        } else {
            console.log("Lỗi khi khởi tạo thanh toán.");
        }
    } catch (error) {
        console.error("Lỗi khi gọi API:", error);
    }
}
export const getSongByArtist = async (artistId) => {
    if (!artistId) {
        throw new Error("no artist id found");
    }
    try {
        const response = await axios.get(`${API_URL}/artist/${artistId}/songs`);
        return response.data
    } catch (e) {
        throw new Error("error get artist's songs");
    }
}

export const getArtistById = async (artistId) => {
    if (!artistId) {
        throw new Error("no artist id found");
    }
    try {
        const response = await axios.get(`${API_URL}/artist/${artistId}`);
        return response.data;
    }
    catch (e) {
        throw new Error("error get artist by id");
    }
}

export const getRecommendSongByArtistIds = async (artistIds) => {
    try {
        const response = await axios.post(`${API_URL}/song/recommend`, {
            artistIds: artistIds // Gửi danh sách artistIds trong body của request
        });
        return response.data; // Trả về dữ liệu bài hát gợi ý
    } catch (error) {
        console.error('Lỗi khi lấy danh sách bài hát gợi ý:', error);
        throw error; // Ném lỗi ra ngoài nếu có vấn đề
    }
};


export const deleteSongFromPlaylist = async (playlistId, songId) => {
    const accessToken = localStorage.getItem('userToken');

    if (!accessToken) {
        throw new Error('No access token found');
    }
    try {
        const response = await axios.post(`${API_URL}/playlist/songs/delete`, {
            playlistId: playlistId,
            songId: songId
        },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            })
        return response.data;
    } catch (e) {
        throw new Error(`Error adding song to playlist: ${e.message}`)
    }
}

export const addSongToPlaylist = async (playlistId, songId) => {
    const accessToken = localStorage.getItem('userToken');

    if (!accessToken) {
        throw new Error('No access token found');
    }
    try {
        const response = await axios.post(`${API_URL}/playlist/songs`, {
            playlistId: playlistId,
            songId: songId
        },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            })
        console.log(response);
        return response.data;
    } catch (e) {
        throw new Error(`Error adding song to playlist: ${e.message}`)
    }
}

export const getPlaylistById = async (playlistId) => {
    const accessToken = localStorage.getItem('userToken');

    if (!accessToken) {
        throw new Error("user is not authenticated");
    }
    try {
        const response = await axios.get(`${API_URL}/playlist/${playlistId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })
        return response.data;
    } catch (e) {
        throw new Error("error get playlist by id");
    }
}
export const updatePlaylist = async (playlistId, newPlaylist) => {
    const accessToken = localStorage.getItem('userToken');

    if (!accessToken) {
        throw new Error("User is not authenticated");
    }

    try {
        console.log('Sending data:', { newPlaylist });
        const response = await axios.put(`${API_URL}/playlist/${playlistId}`, { newPlaylist: newPlaylist }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });

        return response.data;
    } catch (e) {
        console.error('Error editing playlist:', e);
        throw new Error(`Error updating playlist: ${e.message}`);
    }
}

export const deletePlaylist = async (playlistId) => {

}
export const getAllUserPlaylist = async () => {
    const accessToken = localStorage.getItem('userToken');  // Lấy accessToken từ localStorage

    // Kiểm tra xem token có tồn tại không
    if (!accessToken) {
        throw new Error("User is not authenticated");
    }

    try {
        // Gửi yêu cầu GET đến API với header Authorization chứa Bearer token
        const response = await axios.get(`${API_URL}/playlist`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`  // Gửi token trong header Authorization
            }
        });

        return response.data;  // Trả về danh sách playlist từ API
    } catch (error) {
        console.error('Error fetching user playlists:', error);

        // Xử lý lỗi nếu có
        if (error.response) {
            // Lỗi từ server (status khác 2xx)
            throw new Error(error.response.data.message || 'Failed to fetch playlists');
        } else if (error.request) {
            // Lỗi khi không nhận được phản hồi từ server
            throw new Error('No response from server');
        } else {
            // Lỗi khác (cấu hình hoặc lỗi khác)
            throw new Error(error.message);
        }
    }
};

// Hàm Add Playlist
export const addPlaylist = async () => {
    const accessToken = localStorage.getItem('userToken');

    // Kiểm tra nếu token không tồn tại
    if (!accessToken) {
        throw new Error('User is not authenticated');
    }

    try {
        // Gửi request đến API, với headers chính xác
        const response = await axios.post(
            `${API_URL}/playlist/`,
            {}, // Nếu bạn không cần gửi dữ liệu trong body, để rỗng hoặc gửi payload cần thiết.
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,  // Đảm bảo chỉ truyền chuỗi token
                    'Content-Type': 'application/json'
                }
            }
        );

        return response.data;
    } catch (error) {
        // Xử lý lỗi chi tiết
        if (error.response) {
            // Lỗi từ phía server (API trả về status khác 2xx)
            console.error('Server Error:', error.response.data);
            throw new Error(error.response.data.message || 'Failed to add playlist');
        } else if (error.request) {
            // Lỗi do không nhận được phản hồi từ server
            console.error('No response from server:', error.request);
            throw new Error('No response from server');
        } else {
            // Lỗi khác (cấu hình, cú pháp, v.v.)
            console.error('Error:', error.message);
            throw new Error(error.message);
        }
    }
};

//Get song detail
export const getSong = async (id) => {
    try {
        if (!id) {
            console.log("song id not found");
            return;
        }
        const response = await axios.get(`${API_URL}/song/song-detail/${id}`);
        return response.data;

    } catch (e) {
        throw new Error(e);
    }
}
//Xử lý thanh toán momo
export const MoMoPayment = async (price, userPlan) => {
    try {
        // Lấy userId từ localStorage
        const accessToken = localStorage.getItem('userToken');

        // Kiểm tra xem userId có tồn tại không
        if (!accessToken) {
            console.log("User ID không được tìm thấy trong localStorage.");
            return;
        }

        const response = await axios.post(`${API_URL}/payment/momo`,
            {
                amount: price,
                orderInfo: "Thanh toán qua MoMo",
                userPlan: userPlan
            },
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            }
        )

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

//Change Password
export const ChangePassword = async (currentPassword, newPassword) => {
    // Kiểm tra đầu vào
    if (!currentPassword || !newPassword) {
        throw new Error('Mật khẩu không được để trống.');
    }

    try {
        // Lấy user
        const userId = localStorage.getItem('user');

        if (!userId) {
            throw new Error('User không hợp lệ. Vui lòng đăng nhập lại.');
        }

        // Gửi yêu cầu PUT để thay đổi mật khẩu
        const response = await axios.put(
            `${API_URL}/auth/change-password`,
            { currentPassword, newPassword, userId }, // Không cần bao gồm userToken trong body
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );

        console.log('Thay đổi mật khẩu thành công:', response.data);
        return response.data;
    } catch (error) {
        // Xử lý lỗi
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
    const accessToken = localStorage.getItem("userToken");

    // Kiểm tra nếu không có token
    if (!accessToken) {
        throw new Error("No access token found, please log in.");
    }

    try {
        // Gửi yêu cầu GET đến API với header Authorization chứa Bearer token
        const response = await axios.get(`${API_URL}/users/profile`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}` // Sử dụng token xác thực
            }
        });

        return response.data; // Trả về thông tin người dùng từ backend
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error; // Ném lại lỗi để xử lý ở nơi khác
    }
};

export const loginUser = async (userData) => {

    try {
        const response = await axios.post(`${API_URL}/auth/login`, userData, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const { token } = response.data;

        localStorage.setItem('userToken', token);

        return response.data;
    } catch (error) {
        console.error('Login failed:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const logoutUser = async () => {
    try {
        // Gọi API backend để thực hiện đăng xuất
        await axios.post(`${API_URL}/auth/logout`, {}, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        // Xóa token lưu trữ trên client
        localStorage.removeItem('userToken');

        // Chuyển hướng người dùng về trang đăng nhập hoặc trang chủ
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

export const fetchingSongs = async () => {
    try {
        const res = await axios.get(`${API_URL}/song`);
        return res.data;
    } catch (e) {
        throw e;
    }
}