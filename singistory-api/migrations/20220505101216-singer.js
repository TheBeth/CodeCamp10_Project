'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('singers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      last_name: {
        type: Sequelize.STRING,
      },
      birth_date: {
        type: Sequelize.STRING,
        allowNull:false
      },
      birth_place: {
        type: Sequelize.STRING,
        allowNull:false
      },
      title:{
        type :Sequelize.STRING(1000),
        allowNull:false
      },
      singer_img: {
        type: Sequelize.STRING
      },
      website: {
        type: Sequelize.STRING
      },
      facebook: {
        type: Sequelize.STRING
      },
      instragram: {
        type: Sequelize.STRING
      },
      youtube: {
        type: Sequelize.STRING
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

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('singers');
  }
};
