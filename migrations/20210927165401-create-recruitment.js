'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Recruitments', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      nim: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      first_name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      last_name: {
        type: Sequelize.STRING,
      },
      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
      phone: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      address: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      gender: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      birth_date: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      profile_picture: {
        allowNull: false,
        type: Sequelize.STRING(9999),
      },
      profile_description: {
        allowNull: false,
        type: Sequelize.STRING,
        length: 9999,
      },
      faculty: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      year_of_college: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      registration_id: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      registration_date: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      medical_history: {
        allowNull: false,
        type: Sequelize.STRING(9999),
      },
      reason_to_join: {
        type: Sequelize.STRING(9999),
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
    await queryInterface.dropTable('Recruitments')
  },
}
