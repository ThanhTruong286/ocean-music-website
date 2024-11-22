const express = require('express');
const { getWitResponse } = require('../services/witService');
const router = express.Router();

// API nhận câu hỏi từ người dùng và trả lời từ Wit.ai
router.post('/chat', async (req, res) => {
    try {
        const { message } = req.body;  // Lấy thông điệp từ client
        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        // Gửi câu hỏi tới Wit.ai và nhận câu trả lời
        const response = await getWitResponse(message);

        // Trả lời lại cho client
        return res.json({ reply: response });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to communicate with chatbot' });
    }
});

module.exports = router;
