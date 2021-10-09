"use strict";
const { v4: uuidv4 } = require("uuid");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Articles",
      [
        {
          id: uuidv4(),
          title: "Article Test 1",
          description: "article description",
          image: null,
          content: "content articles",
          topics: "872a2532-4c78-4406-af34-5f3244a2736b",
          tags: "6eb50b0d-c6dc-4228-b324-be60ff3bd5d1",
          date: "2021-10-09T12:30:34.235Z",
          authors: "ab6f960f-0240-414a-ab92-cebdba0f14f8",
          status: "tes",
          fileIds: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          title: "Article Test 1",
          description: "article description",
          image: null,
          content: "content articles",
          topics: "872a2532-4c78-4406-af34-5f3244a2736b",
          tags: "6eb50b0d-c6dc-4228-b324-be60ff3bd5d1",
          date: "2021-10-09T12:35:24.102Z",
          authors: "ab6f960f-0240-414a-ab92-cebdba0f14f8",
          status: "tes",
          fileIds: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Articles", null, {});
  },
};
