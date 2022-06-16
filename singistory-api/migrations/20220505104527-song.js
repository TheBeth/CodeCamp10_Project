'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('songs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      song_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      youtube: {
        type: Sequelize.STRING
      },
      spotify: {
        type: Sequelize.STRING
      },
      singer_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'singers'
          },
          key: 'id'
        }
      },
      album_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'albums'
          },
          key: 'id'
        },
        onDelete:'CASCADE'
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('songs');
  }
};
