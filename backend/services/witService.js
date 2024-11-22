const { Wit } = require('node-wit');
require('dotenv').config();

// Khởi tạo Wit client
const client = new Wit({
    accessToken: process.env.WIT_TOKEN,  // Lấy token từ biến môi trường
});

// Hàm gửi câu hỏi đến Wit.ai và xử lý phản hồi
const getWitResponse = async (message) => {
    try {
        // Gửi câu hỏi của người dùng tới Wit.ai để nhận phản hồi
        const response = await client.message(message);

        console.log('Wit.ai response:', response);

        // Kiểm tra Intent được nhận diện
        if (response.intents && response.intents.length > 0) {
            const intent = response.intents[0].name;
            console.log('Detected intent:', intent);

            // Xử lý các Intent khác nhau
            if (intent === 'greeting') {
                return 'Chào bạn! Tôi khỏe, cảm ơn bạn đã hỏi!';
            }

            if (intent === 'help_questions') {
                return 'Tôi cần biết rõ vấn đề hơn. Bạn muốn trợ giúp về vấn đề gì?';
            }

            if (intent === 'reset_password') {
                return 'Để lấy lại mật khẩu, bạn có thể làm theo hướng dẫn tại: localhost:3000/reset-password';
            }

            if (intent === 'goodbye') {
                return 'Cảm ơn bạn đã ghé thăm HOPI';
            }

            if (intent === 'admin') {
                return 'Thằng mập 2 á hả, vừa ngu vừa đần';
            }

            // Nếu không nhận diện được intent
            return 'Xin lỗi, tôi không hiểu câu hỏi của bạn.';
        }

        // Nếu không nhận diện được intent
        return 'Xin lỗi, tôi không hiểu câu hỏi của bạn.';
    } catch (error) {
        console.error('Error communicating with Wit.ai:', error);
        throw new Error('Failed to communicate with Wit.ai');
    }
};

module.exports = { getWitResponse };
