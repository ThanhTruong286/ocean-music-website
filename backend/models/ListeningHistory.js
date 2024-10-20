// ListeningHistoryModel.js
const db = require('../config/db');

class ListeningHistoryModel {
    static getAllListeningHistories(callback) {
        db.query('SELECT * FROM listening_history', callback);
    }

    static createListeningHistory(historyData, callback) {
        db.query('INSERT INTO listening_history (user_id, song_id, listening_time, duration_time) VALUES (?, ?, ?, ?)',
            [historyData.user_id, historyData.song_id, historyData.listening_time, historyData.duration_time], callback);
    }

    static deleteListeningHistory(historyId, callback) {
        db.query('DELETE FROM listening_history WHERE listening_history_id = ?', [historyId], callback);
    }
}

module.exports = ListeningHistoryModel;
