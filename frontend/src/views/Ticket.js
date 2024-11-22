import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import '../styles/ticket.scss';
import { useTopic } from '../context/TopicContext';
import { createTicket } from '../api/api';  // Import API createTicket

const Ticket = () => {
    const { topic } = useTopic();  // Lấy topic từ Context
    const [selectedTopic, setSelectedTopic] = useState(topic);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        username: '',
        subject: selectedTopic,
        details: ''
    });

    const [error, setError] = useState(null); // To handle form errors
    const [successMessage, setSuccessMessage] = useState('');

    // Cập nhật selectedTopic khi topic thay đổi
    useEffect(() => {
        setSelectedTopic(topic);
    }, [topic]);

    // Cập nhật giá trị form khi người dùng nhập
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    // Hàm gửi form
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Gửi dữ liệu đến API
            const response = await createTicket(formData);
            setSuccessMessage('Yêu cầu hỗ trợ của bạn đã được gửi thành công!');
            setError(null); // Xóa lỗi nếu có
        } catch (error) {
            setError('Đã có lỗi xảy ra. Vui lòng thử lại!');
            setSuccessMessage(''); // Xóa thông báo thành công nếu có lỗi
        }
    };

    return (
        <div>
            <aside className="sidebar sidebar-base" id="first-tour" data-toggle="main-sidebar">
                <Sidebar />
            </aside>
            <main className="main-content">
                <div id="home">
                    <Header />
                    <div className="container">
                        <div className="customer-support-header">
                            <h1>TRUNG TÂM HỖ TRỢ KHÁCH HÀNG</h1>
                        </div>
                        <div className="customer-support-search-bar">
                            <input type="text" placeholder="Tìm kiếm nhanh" />
                            <button><i className="fas fa-search"></i></button>
                        </div>
                        <div className="customer-support-content">
                            <div className="customer-support-section">
                                <h2>Liên hệ chúng tôi</h2>
                                <div className="customer-support-form">
                                    <div className="form-group">
                                        <label htmlFor="topic">Chủ đề</label>
                                        <select
                                            id="topic"
                                            value={selectedTopic}
                                            onChange={(e) => setSelectedTopic(e.target.value)}
                                        >
                                            <option>{selectedTopic || 'Chọn chủ đề hỗ trợ'}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="customer-support-section">
                                <h2>Tạo phiếu hỗ trợ</h2>
                            </div>
                        </div>
                        <div className="form-container">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="name">Họ và Tên *</label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="Vui lòng điền đầy đủ họ tên của bạn"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Địa chỉ Email liên hệ *</label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="Garena sẽ liên hệ với bạn qua Email này"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phone">Số điện thoại liên hệ *</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        placeholder="Garena sẽ liên hệ với bạn qua số điện thoại này"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="username">Tên tài khoản cần hỗ trợ</label> {/* Đổi id từ name sang username */}
                                    <input
                                        type="text"
                                        id="username"  // Cập nhật id tại đây
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        placeholder="Vui lòng điền đúng tên đăng nhập"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="details">Thông tin chi tiết *</label>
                                    <textarea
                                        id="details"
                                        value={formData.details}
                                        onChange={handleInputChange}
                                        placeholder="Mô tả chi tiết vấn đề bạn cần được hỗ trợ"
                                    ></textarea>
                                </div>

                                <div className="customer-support-form-group">
                                    <button className="customer-support-btn" type="submit">Gửi yêu cầu hỗ trợ</button>
                                </div>
                            </form>

                            {error && <div className="error-message">{error}</div>}
                            {successMessage && <div className="success-message">{successMessage}</div>}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Ticket;
