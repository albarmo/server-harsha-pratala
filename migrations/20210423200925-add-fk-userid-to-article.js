"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint("Articles", {
      fields: ["author_id"],
      type: "foreign key",
      name: "add fk author_id to Articles",
      references: {
        table: "Anggota",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });

    await queryInterface.addConstraint("Articles", {
      fields: ["topic_id"],
      type: "foreign key",
      name: "add fk topic_id id to Articles",
      references: {
        table: "Topics",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });

    await queryInterface.addConstraint("Articles", {
      fields: ["tags_id"],
      type: "foreign key",
      name: "add fk tags_id id to Articles",
      references: {
        table: "Tags",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });

    await queryInterface.addConstraint("Articles", {
      fields: ["comment_id"],
      type: "foreign key",
      name: "add fk comment_id id to Articles",
      references: {
        table: "Comments",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstaint(
      "Articles",
      "remove fk author_id from carts",
      {}
    );
    await queryInterface.removeConstaint(
      "Articles",
      "remove fk topic_id from carts",
      {}
    );

    await queryInterface.removeConstaint(
      "Articles",
      "remove fk tags_id from carts",
      {}
    );
    await queryInterface.removeConstaint(
      "Articles",
      "remove fk comment_id from carts",
      {}
    );
  },
};
