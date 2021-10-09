"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint("Topics", {
      fields: ["articleId"],
      type: "foreign key",
      name: "Fkey_Topic_Article",
      references: {
        table: "Articles",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint("Topics", "Fkey_Topic_Article", {});
  },
};
