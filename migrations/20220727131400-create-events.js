'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Events', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      is_public: {
        type: Sequelize.BOOLEAN,
      },
      status: {
        type: Sequelize.STRING,
      },
      title: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      content: {
        type: Sequelize.STRING,
      },
      tumbnail: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.INTEGER,
      },
      event_date: {
        type: Sequelize.DATE,
      },
      registration_open_date: {
        type: Sequelize.DATE,
      },
      quota: {
        type: Sequelize.INTEGER,
      },
      publisher_id: {
        type: Sequelize.UUID,
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
    await queryInterface.dropTable('Events')
  },
}
