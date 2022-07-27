'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Events_Participants', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      event_id: {
        type: Sequelize.UUID,
      },
      first_name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      last_name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.STRING,
      },
      profile_picture: {
        type: Sequelize.STRING,
      },
      registration_id: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
      registration_date: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      proof_of_payment: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Events_Participants')
  },
}
