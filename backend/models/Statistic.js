// StatisticsModel.js
const db = require('../config/db');

class StatisticsModel {
    static getAllStatistics(callback) {
        db.query('SELECT * FROM statistics', callback);
    }

    static createStatistics(statisticsData, callback) {
        db.query('INSERT INTO statistics (song_id, play_count) VALUES (?, ?)',
            [statisticsData.song_id, statisticsData.play_count], callback);
    }

    static updateStatistics(statisticsId, statisticsData, callback) {
        db.query('UPDATE statistics SET play_count = ? WHERE statistics_id = ?',
            [statisticsData.play_count, statisticsId], callback);
    }
}

module.exports = StatisticsModel;
