const db = require('../config/db');

class Ticket {
    constructor(id, userId, subject, description, name, email, phone, username, status, priority, createdAt, updatedAt) {
        this.id = id;
        this.userId = userId;
        this.subject = subject;
        this.description = description;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.username = username;
        this.status = status;
        this.priority = priority;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    // Phương thức để tạo mới ticket
    static createTicket(userId, subject, description, name, email, phone, username, status, priority, callback) {
        const query = `INSERT INTO tickets (user_id, subject, description, name, email, phone, username, status, priority, created_at, updated_at)
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`;

        db.query(query, [userId, subject, description, name, email, phone, username, status, priority], (err, result) => {
            if (err) return callback(err, null); // Nếu có lỗi xảy ra trong truy vấn

            // Nếu thêm thành công, trả về đối tượng ticket mới
            const newTicket = new Ticket(
                result.insertId, userId, subject, description, name, email, phone, username, status, priority, new Date(), new Date()
            );
            callback(null, newTicket);
        });
    }

    // Phương thức để lấy thông tin tất cả các ticket
    static getAllTickets(callback) {
        const query = 'SELECT * FROM tickets';

        db.query(query, (err, results) => {
            if (err) return callback(err, null);
            const tickets = results.map(row => new Ticket(
                row.ticket_id, row.user_id, row.subject, row.description, row.name, row.email, row.phone, row.username,
                row.status, row.priority, row.created_at, row.updated_at
            ));
            callback(null, tickets);
        });
    }

    // Phương thức để lấy ticket theo id
    static findById(ticketId, callback) {
        const query = 'SELECT * FROM tickets WHERE ticket_id = ?';

        db.query(query, [ticketId], (err, result) => {
            if (err) return callback(err, null);
            if (result.length === 0) return callback(null, null); // Không tìm thấy ticket

            const ticket = new Ticket(
                result[0].ticket_id, result[0].user_id, result[0].subject, result[0].description, result[0].name,
                result[0].email, result[0].phone, result[0].username, result[0].status, result[0].priority,
                result[0].created_at, result[0].updated_at
            );
            callback(null, ticket);
        });
    }

    // Phương thức để cập nhật ticket
    static updateTicket(ticketId, userId, newData, callback) {
        const query = `
            UPDATE tickets
            SET subject = ?, description = ?, status = ?, priority = ?, updated_at = NOW()
            WHERE ticket_id = ? AND user_id = ?
        `;
        
        db.query(query, [newData.subject, newData.description, newData.status, newData.priority, ticketId, userId], (err, result) => {
            if (err) return callback(err, null);

            if (result.affectedRows === 0) {
                return callback(null, { success: false, message: 'Ticket not found or access denied' });
            }
            callback(null, { success: true, message: 'Ticket updated successfully' });
        });
    }

    // Phương thức để xóa ticket
    static deleteTicket(ticketId, userId, callback) {
        const query = 'DELETE FROM tickets WHERE ticket_id = ? AND user_id = ?';

        db.query(query, [ticketId, userId], (err, result) => {
            if (err) return callback(err, null);

            if (result.affectedRows === 0) {
                return callback(null, { success: false, message: 'Ticket not found or access denied' });
            }

            callback(null, { success: true, message: 'Ticket deleted successfully' });
        });
    }

    // Phương thức để lưu ticket (thêm mới hoặc cập nhật)
    save(callback) {
        if (this.id) {
            // Nếu đã có id, thực hiện cập nhật ticket
            const query = `
                UPDATE tickets
                SET subject = ?, description = ?, status = ?, priority = ?, updated_at = NOW()
                WHERE ticket_id = ?
            `;
            db.query(query, [this.subject, this.description, this.status, this.priority, this.id], callback);
        } else {
            // Nếu chưa có id, thực hiện thêm mới ticket
            const query = `
                INSERT INTO tickets (user_id, subject, description, name, email, phone, username, status, priority, created_at, updated_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
            `;
            db.query(query, [this.userId, this.subject, this.description, this.name, this.email, this.phone, this.username, this.status, this.priority], (err, result) => {
                if (err) return callback(err);
                this.id = result.insertId; // Cập nhật id sau khi insert thành công
                callback(null, this);
            });
        }
    }

    // Phương thức xóa ticket
    delete(callback) {
        db.query('DELETE FROM tickets WHERE ticket_id = ?', [this.id], callback);
    }
}

module.exports = Ticket;
