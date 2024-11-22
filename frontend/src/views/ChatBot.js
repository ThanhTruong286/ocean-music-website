import React, { useState } from 'react';
import { sendMessage } from '../api/api';
import "../styles/chatbot.scss";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

const ChatBot = () => {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState("");
    const handleSendMessage = async () => {
        if (!userInput.trim()) return;

        // Hiển thị tin nhắn của người dùng
        setMessages([...messages, { text: userInput, sender: 'user' }]);

        try {
            // Gửi tin nhắn và nhận phản hồi từ server
            const botResponse = await sendMessage(userInput);
            console.log("Bot response:", botResponse);

            // Kiểm tra xem botResponse có giá trị hợp lệ không
            if (botResponse) {
                // Hiển thị phản hồi từ bot
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { text: botResponse, sender: 'bot' },
                ]);
            } else {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { text: 'Không có phản hồi từ bot.', sender: 'bot' },
                ]);
            }
        } catch (error) {
            console.error('Error:', error);
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: 'Có lỗi xảy ra, vui lòng thử lại.', sender: 'bot' },
            ]);
        }

        // Xóa input sau khi gửi
        setUserInput("");
    };
    return (
        <div>
            <aside className="sidebar sidebar-base" id="first-tour" data-toggle="main-sidebar">
                <Sidebar />
            </aside>
            <main className="main-content">
                <div id="home">
                    <Header />
                    <div className='container'>
                        <h4>Trợ Giúp Từ Hopi</h4>
                        <div className="chatbot-wrapper">
                            <div className="chat-container">
                                <div className="messages">
                                    {messages.map((msg, index) => (
                                        <div
                                            key={index}
                                            className={`message ${msg.sender}`}
                                        >
                                            {msg.text}
                                        </div>
                                    ))}
                                </div>
                                <div className="input-container">
                                    <input
                                        type="text"
                                        value={userInput}
                                        onChange={(e) => setUserInput(e.target.value)}
                                        placeholder="Nhập tin nhắn..."
                                    />
                                    <button onClick={handleSendMessage}>Gửi</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );

};

export default ChatBot;