'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('songs', {
      song_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      duration: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      genre_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      release_date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      file_url: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      cover_image_url: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      lyric: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      play_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('songs');
  },
};
