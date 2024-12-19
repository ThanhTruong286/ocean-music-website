'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('listening_history', {
      listening_history_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      song_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      listening_time: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      duration_time: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('listening_history');
  },
};
