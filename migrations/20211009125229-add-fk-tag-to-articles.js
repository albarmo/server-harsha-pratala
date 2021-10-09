"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint("Tags", {
      fields: ["articleId"],
      type: "foreign key",
      name: "Fkey_Tags_Article",
      references: {
        table: "Articles",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint("Tags", "Fkey_Tags_Article", {});
  },
};
