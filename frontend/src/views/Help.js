import React from 'react';
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import '../styles/help.scss';

// CREATE TABLE tickets (
//     ticket_id INT AUTO_INCREMENT PRIMARY KEY,
//     user_id INT NOT NULL,
//     subject VARCHAR(255) NOT NULL,
//     description TEXT NOT NULL,
//     status ENUM('Open', 'In Progress', 'Closed', 'Resolved') DEFAULT 'Open',
//     priority ENUM('Low', 'Medium', 'High') DEFAULT 'Medium',
//     assigned_to INT NULL,
//     created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
//     updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
//     closed_at DATETIME NULL,
//     resolved_at DATETIME NULL,
//     attachment VARCHAR(255) NULL,
//     customer_feedback TEXT NULL,
//     ticket_type ENUM('Technical', 'Billing', 'General', 'Other') DEFAULT 'General',
//     FOREIGN KEY (user_id) REFERENCES users(user_id), -- Giả sử bảng 'users' đã có
//     FOREIGN KEY (assigned_to) REFERENCES employees(employee_id) -- Giả sử bảng 'employees' đã có
// );

const Help = () => {

    return (
        <div>
            <aside className="sidebar sidebar-base" id="first-tour" data-toggle="main-sidebar">
                <Sidebar />
            </aside>
            <main className="main-content">
                <div id="home">
                    <Header />
                    <div className='container'>
                        <div className="section">
                            <h2>Hỗ trợ Tài khoản Ocean</h2>
                            <ul>
                                <li>Hỗ trợ khôi phục Mật khẩu</li>
                                <li>Hỗ trợ thay đổi Số điện thoại</li>
                                <li>Hỗ trợ thay đổi nhanh Email/SĐT xác thực</li>
                                <li>Hủy hỗ trợ thay đổi thông tin và mở khóa tài khoản</li>
                                <li>Hỗ trợ xóa tài khoản</li>
                            </ul>
                        </div>
                        <div className="section">
                            <h2>Bảo mật tài khoản Ocean</h2>
                            <ul>
                                <li>Hướng dẫn bảo mật tài khoản Garena</li>
                                <li>Hướng dẫn khôi phục Mật khẩu bằng thông tin bảo mật</li>
                                <li>Hướng dẫn xác thực Email và Số điện thoại</li>
                                <li>Hướng dẫn cập nhật thông tin CMND</li>
                                <li>Liên kết tài khoản Garena và Facebook</li>
                                <li>Hướng dẫn sử dụng Google Authenticator</li>
                            </ul>
                        </div>
                        <div className="section">
                            <h2>Tài khoản bị khóa</h2>
                            <ul>
                                <li>Tài khoản Ocean bị khóa</li>
                            </ul>
                        </div>
                        <div className="section">
                            <h2>Góp Ý</h2>
                            <ul>
                                <li>Góp ý tài khoản Ocean</li>
                            </ul>
                        </div>
                        <div className="section">
                            <h2>Tố Cáo Lừa Đảo</h2>
                            <ul>
                                <li>Tiếp nhận thông tin lừa đảo</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Help;
