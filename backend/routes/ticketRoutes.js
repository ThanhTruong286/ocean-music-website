const express = require('express');
const router = express.Router();
const TicketController = require('../controllers/ticketController');
const authenticateToken = require('../middlewares/authMiddleware');

// Lấy tất cả tickets
router.get('/', TicketController.getTickets);

// Lấy tất cả tickets của người dùng
router.get('/user', TicketController.getTicketsByUserId);

// Tạo mới một ticket
router.post('/',authenticateToken, TicketController.createTicket);

// Cập nhật một ticket
router.put('/:id', TicketController.updateTicket);

// Xóa một ticket
router.delete('/:id', TicketController.deleteTicket);

// Lấy thông tin ticket theo ID
router.get('/:id', TicketController.getTicketById);

router.get('/user/:id', TicketController.getTicketsByUserId);

module.exports = router;
