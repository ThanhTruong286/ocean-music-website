import Swal from 'sweetalert2';
import { deleteTicket } from '../api/api'; 
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import '../styles/userTicket.scss';
import { getUser, getUserTicket } from "../api/api";

const Ticket = () => {

    const [tickets, setTicket] = useState([]);
    const [loadingTicket, setLoadingTicket] = useState(true);
    const [ticketError, setTicketError] = useState(null);
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('userToken');
        if (token) {
            setAccessToken(token);
        } else {
            console.error('No access token found');
        }
    }, []);

    useEffect(() => {
        const fetchUser = async () => {
            if (accessToken) {
                try {
                    const data = await getUser();
                    setUser(data);  // Set user state with the fetched data
                } catch (error) {
                    console.error('Error fetching user:', error);
                }
            }
        };

        if (accessToken) {
            fetchUser();
        }
    }, [accessToken]);

    useEffect(() => {
        const fetchTicket = async () => {
            if (user && user.user_id) {  // Ensure user is not null before calling the API
                try {
                    const data = await getUserTicket(user.user_id);
                    setTicket(data);
                } catch (error) {
                    setTicketError('Error fetching ticket:', error);
                } finally {
                    setLoadingTicket(false);
                }
            }
        };

        if (user && user.user_id) {
            fetchTicket();
        }
    }, [user]);

    const [currentPage, setCurrentPage] = useState(1);
    const [ticketsPerPage] = useState(2); // Number of tickets per page

    // Pagination logic
    const indexOfLastTicket = currentPage * ticketsPerPage;
    const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
    const currentTickets = tickets.slice(indexOfFirstTicket, indexOfLastTicket);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Handle ticket delete action with SweetAlert2
    const handleDelete = async (ticketId) => {
        // Hiển thị SweetAlert2 để xác nhận xóa
        const result = await Swal.fire({
            title: 'Bạn có chắc chắn muốn xóa ticket này?',
            text: "Hành động này không thể hoàn tác!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Hủy'
        });

        if (result.isConfirmed) {
            try {
                // Gọi API để xóa ticket
                await deleteTicket(ticketId);
                // Cập nhật lại danh sách ticket sau khi xóa
                setTicket(tickets.filter(ticket => ticket.ticket_id !== ticketId));
                Swal.fire(
                    'Đã xóa!',
                    'Ticket đã được xóa thành công.',
                    'success'
                );
            } catch (error) {
                console.error('Error deleting ticket:', error);
                Swal.fire(
                    'Lỗi!',
                    'Xóa ticket thất bại.',
                    'error'
                );
            }
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
                    <div className="cthkh-content">
                        <h2>DANH SÁCH PHIẾU HỖ TRỢ</h2>
                        <div className="cthkh-tabs">
                            <div className="active">TẤT CẢ</div>
                            <div>ĐANG XỬ LÝ</div>
                            <div>HOÀN THÀNH</div>
                            <div>TỪ CHỐI</div>
                            <div>ĐỢI BẠN PHẢN HỒI</div>
                        </div>
                        <div className="cthkh-alert">
                            T1 hỗ trợ hoàn toàn miễn phí. Chúng tôi KHÔNG yêu cầu cung cấp mật khẩu tài khoản hay đóng bất kỳ chi phí nào.
                        </div>

                        {/* Render ticket table */}
                        <table className="ticket-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Tiêu đề</th>
                                    <th>Mô tả</th>
                                    <th>Người tạo</th>
                                    <th>Email</th>
                                    <th>Trạng thái</th>
                                    <th>Ưu tiên</th>
                                    <th>Ngày tạo</th>
                                    <th>Cập nhật</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentTickets.length > 0 ? (
                                    currentTickets.map((ticket) => (
                                        <tr key={ticket.ticket_id}>
                                            <td>{ticket.ticket_id}</td>
                                            <td>{ticket.subject}</td>
                                            <td>{ticket.description}</td>
                                            <td>{ticket.name}</td>
                                            <td>{ticket.email}</td>
                                            <td>{ticket.status}</td>
                                            <td>{ticket.ticket_type}</td>
                                            <td>{ticket.created_at}</td>
                                            <td>{ticket.updated_at}</td>
                                            <td>
                                                <button onClick={() => handleDelete(ticket.ticket_id)} className="delete-button">
                                                    Xóa
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="10" className="cthkh-no-info">Không có thông tin</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        {/* Pagination */}
                        <div className="pagination">
                            {Array.from({ length: Math.ceil(tickets.length / ticketsPerPage) }, (_, index) => (
                                <button key={index + 1} onClick={() => paginate(index + 1)} className={currentPage === index + 1 ? 'active' : ''}>
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Ticket;
