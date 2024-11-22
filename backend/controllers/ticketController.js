const Ticket = require('../models/Ticket'); 

// Lấy danh sách tất cả các ticket
exports.getTickets = (req, res) => {
    TicketModel.getAllTickets((err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching tickets', error: err });
        }
        res.json(results);
    });
};

// Lấy danh sách các ticket của một người dùng theo userId
exports.getTicketsByUserId = (req, res) => {
    const userId = req.user.userId; // Lấy userId từ request (giả sử đã có xác thực)

    TicketModel.findByUserId(userId, (err, tickets) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching tickets for user', error: err });
        }
        res.json(tickets);
    });
};

// Ví dụ controller tạo ticket
exports.createTicket = (req, res) => {
    const { name, email, phone, username, subject, details } = req.body;
    const userId = req.user.userId;

    Ticket.createTicket(userId, subject, details, name, email, phone, username, null, null, (err, newTicket) => {
        if (err) {
            console.error("Error creating ticket:", err);  // In chi tiết lỗi ra console
            return res.status(500).json({ message: 'Error creating ticket', error: err.message });
        }
        res.status(201).json({ message: 'Ticket created successfully', ticket: newTicket });
    });
};

// Lấy tất cả ticket
exports.getAllTickets = (req, res) => {
    Ticket.getAllTickets((err, tickets) => {
        if (err) return res.status(500).json({ message: 'Error fetching tickets', error: err.message });
        res.status(200).json(tickets);
    });
};

// Cập nhật thông tin ticket theo ID
exports.updateTicket = (req, res) => {
    const ticketId = req.params.id;
    const updatedData = req.body;

    TicketModel.update(ticketId, updatedData, (err, result) => {
        if (err) {
            console.error("Error processing update request:", err);
            return res.status(500).json({
                message: "Error processing update request",
                error: err
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: `Ticket with ID ${ticketId} not found`
            });
        }

        res.json({
            message: 'Ticket updated successfully',
            ticketId: ticketId
        });
    });
};

// Xóa ticket theo ID
exports.deleteTicket = (req, res) => {
    const ticketId = req.params.id;

    TicketModel.deleteById(ticketId, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error deleting ticket', error: err });
        }
        res.json({ message: 'Ticket deleted successfully' });
    });
};

// Lấy thông tin ticket theo ID
exports.getTicketById = (req, res) => {
    const ticketId = req.params.id;

    TicketModel.findById(ticketId, (err, ticket) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching ticket by ID', error: err });
        }
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }
        res.json(ticket);
    });
};
