// CommentModel.js
const db = require('../config/db');

class CommentModel {
    static getAllComments(callback) {
        db.query('SELECT * FROM comments', callback);
    }

    static createComment(commentData, callback) {
        db.query('INSERT INTO comments (user_id, song_id, comment) VALUES (?, ?, ?)',
            [commentData.user_id, commentData.song_id, commentData.comment], callback);
    }

    static deleteComment(commentId, callback) {
        db.query('DELETE FROM comments WHERE comment_id = ?', [commentId], callback);
    }
}

module.exports = CommentModel;
