"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Articles", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      image: {
        type: Sequelize.STRING,
      },
      content: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      topics: {
        allowNull: false,
        type: Sequelize.UUID,
      },
      tags: {
        type: Sequelize.UUID,
      },
      date: {
        type: Sequelize.DATE,
      },
      authors: {
        allowNull: false,
        type: Sequelize.UUID,
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      fileIds: { type: Sequelize.UUID },
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
    await queryInterface.dropTable("Articles");
  },
};
