"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Recruitments", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      firstName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      lastName: {
        type: Sequelize.STRING,
      },
      address: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      phone: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
      birthDate: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      faculty: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      year: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      medicalHistory: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      experience: {
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
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Recruitments");
  },
};
