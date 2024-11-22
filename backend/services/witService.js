const { Wit } = require('node-wit');
require('dotenv').config();
const axios = require('axios');
const { htmlToText } = require('html-to-text');

// Khởi tạo Wit client
const client = new Wit({
    accessToken: process.env.WIT_TOKEN,  // Lấy token từ biến môi trường
});

// Google Custom Search API key và CX
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const GOOGLE_CX = process.env.GOOGLE_CX;

// Hàm tìm kiếm thông tin nghệ sĩ hoặc bài hát trên Google (hoặc Wikipedia)
const searchOnGoogle = async (query) => {
    try {
        const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}&key=${GOOGLE_API_KEY}&cx=${GOOGLE_CX}`;
        console.log("Google Search URL:", url);

        const response = await axios.get(url);
        console.log("Google Search Response:", response.data);

        const items = response.data.items;

        if (items && items.length > 0) {
            let searchResults = 'Dưới đây là các kết quả tìm kiếm:\n\n'; // Thêm dòng giới thiệu
            items.forEach((item, index) => {
                searchResults += `Kết quả ${index + 1}:\n`; // Tên kết quả
                searchResults += `Tiêu đề: ${item.title}\n`; // Tiêu đề
                searchResults += `Mô tả: ${item.snippet}\n`; // Mô tả ngắn
                searchResults += `Link: ${item.link}\n`; // Link đến kết quả
                searchResults += '\n------------------------\n'; // Ngăn cách kết quả với nhau
            });
            return searchResults;
        } else {
            return 'Không tìm thấy kết quả nào cho câu hỏi của bạn.';
        }
    } catch (error) {
        console.error('Error fetching from Google:', error);
        return 'Đã xảy ra lỗi khi tìm kiếm thông tin từ Google.';
    }
};

// Hàm gửi câu hỏi đến Wit.ai và xử lý phản hồi
const getWitResponse = async (message) => {
    try {
        const response = await client.message(message);

        console.log('Wit.ai response:', response);

        if (response.intents && response.intents.length > 0) {
            const intent = response.intents[0].name;
            console.log('Detected intent:', intent);

            if (intent === 'greeting') {
                return 'Chào bạn! Tôi có thể giúp gì cho bạn hôm nay?';
            }

            if (intent === 'goodbye') {
                return 'Cảm ơn bạn đã ghé thăm, chúc bạn một ngày vui vẻ!';
            }

            if (intent === 'get_song_info') {
                // Tìm kiếm bài hát nổi tiếng của nghệ sĩ
                const artistName = response.entities['artist_name:artist_name'] ? response.entities['artist_name:artist_name'][0].value : '';
                if (artistName) {
                    const googleResults = await searchOnGoogle(`bài hát nổi tiếng của ${artistName}`);
                    return googleResults;
                } else {
                    return 'Vui lòng cung cấp tên nghệ sĩ để tôi tìm bài hát nổi tiếng của họ.';
                }
            }

            if (intent === 'get_awards') {
                // Tìm kiếm giải thưởng của nghệ sĩ
                const artistName = response.entities['artist_name:artist_name'] ? response.entities['artist_name:artist_name'][0].value : '';
                if (artistName) {
                    const googleResults = await searchOnGoogle(`giải thưởng của ${artistName}`);
                    return googleResults;
                } else {
                    return 'Vui lòng cung cấp tên nghệ sĩ để tôi tìm giải thưởng của họ.';
                }
            }

            if (intent === 'get_artist_info') {
                // Lấy tên nghệ sĩ từ entity artist_name
                const artistName = response.entities['artist_name:artist_name'] ? response.entities['artist_name:artist_name'][0].value : '';
                console.log('Artist Name:', artistName); // Kiểm tra giá trị tên nghệ sĩ nhận diện được

                if (artistName) {
                    const googleResults = await searchOnGoogle(`thông tin về ${artistName}`);
                    return googleResults;
                } else {
                    return 'Vui lòng cung cấp tên nghệ sĩ để tôi tìm thông tin của họ.';
                }
            }

            return 'Xin lỗi, tôi không hiểu câu hỏi của bạn.';
        }

        return 'Xin lỗi, tôi không hiểu câu hỏi của bạn.';
    } catch (error) {
        console.error('Error communicating with Wit.ai:', error);
        return 'Đã xảy ra lỗi khi xử lý yêu cầu của bạn. Xin thử lại sau.';
    }
};

module.exports = { getWitResponse };
